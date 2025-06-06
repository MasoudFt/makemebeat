const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require('fs');
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const uploadMusic = multer({ dest: "uploads/musics" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    console.log("fileStrorage:",file)
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`; // ایجاد نام منحصر به فرد برای فایل
    cb(null, filename);
  }
});
const upload2 = multer({ storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));





const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mat@123456@",
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  db.query(
    "CREATE DATABASE IF NOT EXISTS MakeMeBeat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci",
    (err) => {
      if (err) throw err;
      console.log("Database MakeMeBeat created or already exists");

      db.query("USE MakeMeBeat", (err) => {
        if (err) throw err;
        console.log("Using database MakeMeBeat");

        // Create users table if it doesn't exist
        const createTableUserQuery = `
        CREATE TABLE IF NOT EXISTS users (
          userID INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          name VARCHAR(255),
          family VARCHAR(255),
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          mobilePhone VARCHAR(20),
          stadiouadrres VARCHAR(255),
          certificateSatdiouNumber VARCHAR(255),
          buyer BOOLEAN DEFAULT FALSE,
          seller BOOLEAN DEFAULT FALSE,
          createat VARCHAR(255),
          artist BOOLEAN DEFAULT FALSE,
          tozihat TEXT
        )`;
        db.query(createTableUserQuery, (err) => {
          if (err) throw err;
          console.log("Users table created or already exists");
        });
        const createVideoUploadTableQuery = `
      CREATE TABLE IF NOT EXISTS video_upload (
    post_id INT AUTO_INCREMENT PRIMARY KEY,  
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    filepathImage VARCHAR(255) ,
    createat VARCHAR(255)  ,
    isShow tinyint  ,
    tozihat TEXT,
    likeproduct VARCHAR(255)  ,
    type VARCHAR(255)  ,
    director INT DEFAULT 0,
    nameSdirector VARCHAR(255) DEFAULT '',
    actor INT DEFAULT 0,
    nameSactor VARCHAR(255) DEFAULT '',
    senarioWriter INT DEFAULT 0,
    nameSsenarioWriter VARCHAR(255) DEFAULT '',
    productionManager INT DEFAULT 0,
    nameSproductionManager VARCHAR(255) DEFAULT '',
    cinematographer INT DEFAULT 0,
    nameScinematographer VARCHAR(255) DEFAULT '',
    lightingDesigner INT DEFAULT 0,
    nameSlightingDesigner VARCHAR(255) DEFAULT '',
    makeUpArtist INT DEFAULT 0,
    nameSmakeUpArtist VARCHAR(255) DEFAULT '',
    setPlace VARCHAR(255) DEFAULT '',
    nameSsetPlace VARCHAR(255) DEFAULT '',
    costumeDesigner INT DEFAULT 0,
    nameScostumeDesigner VARCHAR(255) DEFAULT '',
    fieldSpesialEffectDesigner INT DEFAULT 0,
    nameSfieldSpesialEffectDesigner VARCHAR(255) DEFAULT '',
    visualEffectDseigner INT DEFAULT 0,
    nameSvisualEffectDseigner VARCHAR(255) DEFAULT '',
    edit INT DEFAULT 0,
    nameSedit VARCHAR(255) DEFAULT '',
    otherFactor INT DEFAULT 0,
    nameSotherFactor VARCHAR(255) DEFAULT '',
    cameraCount INT DEFAULT 0,
    cameraModel VARCHAR(255) DEFAULT '',
    lightingCount INT DEFAULT 0,
    lightingModel VARCHAR(255) DEFAULT '',
    moveMentEquipmentCranes VARCHAR(255) DEFAULT '',
    moveMentEquipmentHelishot VARCHAR(255) DEFAULT '',
    moveMentEquipmentRonin VARCHAR(255) DEFAULT '',
    moveMentEquipmentRail VARCHAR(255) DEFAULT '',
    otherEquipment TEXT,
    orginalPrice VARCHAR(255),
    discountPrice VARCHAR(255),
    demoVideofile VARCHAR(255) DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES users(userID)
);
      `;
        db.query(createVideoUploadTableQuery, (err) => {
          if (err) throw err;
          console.log("Table video_upload checked/created");
        });

      });
    }
  );
});


app.post("/users/register", async (req, res) => {
  const {
    username,
    email,
    password,
    mobile,
    name = null,
    family = null,
    type = true,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // تعیین نوع خریدار و فروشنده
    const buyer = type === true || type === "true" ? 1 : 0;
    const seller = !buyer ? 1 : 0;

    const query = `
      INSERT INTO users (username, email, password, mobilePhone, name, family, buyer, seller, profile_path) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL) 
    `; // فیلد profile_path به عنوان NULL

    await db.query(query, [username, email, hashedPassword, mobile, name, family, buyer, seller], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send({ message: "User already exists" });
        }
        return res.status(500).send(err);
      }
      res.send("User created successfully");
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});
app.put("/users/update/:userId", upload2.single('image'), async (req, res) => {
  const userId = req.params.userId;
  let profilePath = req.file ? req.file.path : null; // مسیر عکس بارگذاری شده

  // اگر هیچ عکسی بارگذاری نشده باشد، باید از به‌روزرسانی صرف‌نظر کنیم
  if (!profilePath) {
    return res.status(400).send({ message: "No image uploaded" });
  }

  const query = `UPDATE users SET profile_path = ? WHERE userID = ?`;

  try {
    // استفاده از Promise برای db.query
    const result = await new Promise((resolve, reject) => {
      db.query(query, [profilePath, userId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    // بررسی اینکه آیا کاربر به‌روزرسانی شده است یا خیر
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "User  not found" });
    }

    res.send("User  updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Server error" });
  }
});


const JWT_SECRET = "your_jwt_secret";
// console.log("JWT_SECRET",JWT_SECRET)

// Middleware for authentication
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader :",authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // استخراج توکن از هدر
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.sendStatus(403); 
      }
      req.user = user; 
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};


// ورود کاربر
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(401).send("User  not found");
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send("Invalid credentials");
      }
      // ایجاد توکن JWT
      const token = jwt.sign({ userID: user.userID }, JWT_SECRET, {
        expiresIn: "7D",
      });
      res.json({ token, userId: user.userID, username: user.username });
    }
  );
});



// خواندن تمام کاربرها (Protected Route)
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});


//خواندن تک کاربر
app.get("/users/:id", (req, res) => {
  const userId = req.params.id; // استفاده از پارامتر id از URL
  db.query(
    "SELECT userID, username, name,password ,mobilePhone,email ,stadioAddress, buyer, seller,profile_path ,createdAt, artist, tozihat FROM users WHERE userID = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      if (results.length === 0) {
        return res.status(404).send("User  not found");
      }
      res.json(results[0]);
    }
  );
});




app.post("/musics",
  uploadMusic.fields([
    { name: "productImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "demoMP3File", maxCount: 1 },
    { name: "mainMP3File", maxCount: 1 },
    { name: "tagMP3", maxCount: 1 },
    { name: "waveFile", maxCount: 1 },
    { name: "projectFile", maxCount: 1 }
  ]),
  (req, res) => {
    // console.log("Request Files:", req.files);
    // console.log("Request Body:", req.body);

    const {
      user_id,
      productName: title,
      createat,
      view,
      likeproduct,
      post_id,
      sheroMelody,
      tanzim,
      sampleproduct,
      type,
      gener,
      gammuisc,
      tempo,
      productDescription: tozihat,
      primaryAmount: orginalPriceTanzim,
      discountAmount: discountPriceTanzim,
    } = req.body;

    // بررسی و تعیین مسیر فایل‌ها
    const file_pathImage = req.files.productImage?.[0]?.path || null; // مسیر تصویر محصول
    const file_typeImage = req.files.productImage?.[0]?.mimetype || null; // نوع تصویر محصول
    const file_pathMP3demo = req.files.demoMP3File?.[0]?.path || null; // مسیر فایل دمو
    const file_typeMP3demo = req.files.demoMP3File?.[0]?.mimetype || null; // نوع فایل دمو
    const file_pathMP3Orginal = req.files.mainMP3File?.[0]?.path || null; // مسیر فایل اصلی
    const file_typeMP3Orginal = req.files.mainMP3File?.[0]?.mimetype || null; // نوع فایل اصلی
    const file_pathtagMP3 = req.files.tagMP3?.[0]?.path || null; // مسیر فایل تگ
    const file_typeTagMP3 = req.files.tagMP3?.[0]?.mimetype || null; // نوع فایل تگ
    const file_pathWave = req.files.waveFile?.[0]?.path || null; // مسیر فایل wave
    const file_typeWave = req.files.waveFile?.[0]?.mimetype || null; // نوع فایل wave
    const file_pathProjectLine = req.files.projectFile?.[0]?.path || null; // مسیر فایل پروژه
    const file_typeProjectLine = req.files.projectFile?.[0]?.mimetype || null; // نوع فایل پروژه
    const file_pathCoverSample = req.files.coverImage?.[0]?.path || null; // مسیر کاور نمونه
    const file_typeCoverSample = req.files.coverImage?.[0]?.mimetype || null; // نوع کاور نمونه
    const isShow=0
    // کوئری INSERT
    db.query(
      `INSERT INTO musics 
      (user_id, title, file_typeImage, file_pathImage, cover_path, createat, view, likeproduct, post_id, isShow,
       sheroMelody, tanzim, sampleproduct, type, gener, gammuisc, tempo, tozihat, 
       file_pathMP3demo, file_typeMP3demo, file_pathMP3Orginal, file_typeMP3Orginal, 
       file_pathtagMP3, file_typeTagMP3, file_pathWave, file_typeWave,
       file_pathProjectLine, file_typeProjectLine, orginalPriceTanzim, discountPriceTanzim, 
       file_pathCoverSample, file_typeCoverSample) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id || null,
        title || null,
        file_typeImage,
        file_pathImage,
        file_pathCoverSample,
        createat || null,
        view || null,
        likeproduct || null,
        post_id || null,
        isShow,
        sheroMelody || 0,
        tanzim || 0,
        sampleproduct || 0,
        type || null,
        gener || null,
        gammuisc || null,
        tempo || null,
        tozihat || null,
        file_pathMP3demo,
        file_typeMP3demo,
        file_pathMP3Orginal,
        file_typeMP3Orginal,
        file_pathtagMP3,
        file_typeTagMP3,
        file_pathWave,
        file_typeWave,
        file_pathProjectLine,
        file_typeProjectLine,
        orginalPriceTanzim || null,
        discountPriceTanzim || null,
        file_pathCoverSample,
        file_typeCoverSample,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).send("Error uploading music.");
        }
        res.send({ status: 201, message: "بارگذاری موسیقی با موفقیت انجام شد" });
      }
    );
  }
);

app.get('/download/:id', (req, res) => {
  const fileId = req.params.id;

  // کوئری برای یافتن اطلاعات مربوط به فایل در دیتابیس بر اساس ID
  db.query(
    `SELECT 
        m.title, 
        u.username AS artistName, 
        m.likeproduct, 
        m.type, 
        m.gener, 
        m.file_typeImage, 
        m.orginalPriceTanzim, 
        m.tempo,
        m.post_id,
        m.tozihat,
        m.file_pathMP3Orginal, 
        m.file_typeMP3demo, 
        m.file_typeMP3Orginal, 
        m.file_typetagMP3, 
        m.file_typeWave, 
        m.file_typeProjectLine, 
        m.file_typeCoverSample,
        m.view,
        m.sampleproduct,
        m.tanzim,
        m.sheroMelody,
        m.gammuisc 
     FROM 
        musics m
     JOIN 
        users u 
     ON 
        m.user_id = u.userID
     WHERE 
        m.post_id = ?`, 
    [fileId],
    (err, results) => {
      if (err) {
        console.error('Error retrieving file data from database:', err);
        return res.status(500).send('Error retrieving file data.');
      }

      if (results.length === 0) {
        return res.status(404).send('File not found.');
      }

      const file = results[0];
      const filePath = path.join(__dirname, file.file_pathMP3Orginal);
      const fileExtension = path.extname(file.file_pathMP3Orginal); // اصلاح شده
      console.log("file,", file);
      console.log("fileExtension,", fileExtension);
      let contentType = 'application/octet-stream'; // نوع پیش‌فرض، برای فایل‌های ناشناخته

      switch (fileExtension) {
        case '.mp3':
          contentType = 'audio/mpeg';
          break;
        case '.wav':
          contentType = 'audio/wav';
          break;
        // می‌توانید انواع بیشتری اضافه کنید
        default:
          contentType = 'application/octet-stream';
      }
      
      // تنظیم نوع محتوا
      res.setHeader('Content-Type', contentType);

      // دانلود فایل با نام صحیح
      const downloadFileName = `${file.title}${fileExtension}`; // نام فایل با پسوند
      res.download(filePath, downloadFileName, (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Error downloading the file.');
        }
      });
    }
  );
});

app.get("/musics/like/:type", (req, res) => {
  const type = req.params.type;

  if (!type) {
    return res.status(400).send("لطفاً ژانر را مشخص کنید.");
  }

  db.query(
    `SELECT 
        m.title, 
        u.username AS artistName, 
        m.likeproduct, 
        m.type, 
        m.gener, 
        m.post_id, 
        m.file_pathImage, 
        m.file_pathtagMP3, 
        m.file_pathMP3Orginal, 
				m.orginalPriceTanzim, 
				m.tempo,
				m.tozihat,
				discountPriceTanzim,
        view,
        sampleproduct,
        tanzim,
        sheroMelody,
        m.gammuisc 
     FROM 
        musics m
     JOIN 
        users u 
     ON 
        m.user_id = u.userID WHERE type LIKE ?`,
    [`%${type}%`], // جستجو با استفاده از LIKE برای پیدا کردن ژانرهای مرتبط
    (err, results) => {
      if (err) {
        return res.status(500).send("خطا در اجرای کوئری: " + err);
      }
      if (results.length === 0) {
        return res.status(404).send("سبک مشابه ای  پیدا نشد.");
      }
      res.json(results);
    }
  );
});


app.get("/musics", (req, res) => {
  db.query(
    `SELECT 
        m.title, 
        u.username AS artistName, 
        m.likeproduct, 
        m.type, 
        m.gener, 
        m.file_pathImage, 
				m.orginalPriceTanzim, 
				m.tempo,
				m.post_id,
				m.tozihat, 
        m.file_pathtagMP3, 
        m.file_pathMP3Orginal, 
				discountPriceTanzim,
        view,
        sampleproduct,
        tanzim,
        sheroMelody,
        m.gammuisc 
     FROM 
        musics m
     JOIN 
        users u 
     ON 
        m.user_id = u.userID`
    , (err, results) => {
    if (err) return res.status(500).send(err);

    // باید مسیر فایل را تبدیل کنیم تا به درستی قابل دسترسی باشد
    const musicList = results.map((music) => ({
      ...music,
      // file_path: `http://localhost:3000/${music.file_path}`, // اضافه کردن آدرس کامل
    }));

    res.json(musicList);
  });
});


app.get("/musics/:page", (req, res) => {
  const page = parseInt(req.params.page);
  const limit = 6; 
  const offset = (page - 1) * limit;

  db.query("SELECT * FROM musics LIMIT ? OFFSET ?", [limit, offset], (err, results) => {
    if (err) return res.status(500).send(err);

    // باید مسیر فایل را تبدیل کنیم تا به درستی قابل دسترسی باشد
    const musicList = results.map((music) => ({
      ...music,
      file_path: `http://localhost:3000/${music.file_path}`, // اضافه کردن آدرس کامل
    }));

    res.json(musicList);
  });
});


app.get("/musics/:idOrFilePath/:page/", (req, res) => {
  const idOrFilePath = req.params.idOrFilePath;
  const page = parseInt(req.params.page) || 1;
  const limit =  6; 
  const offset = (page - 1) * limit; 

  if (/^\d+$/.test(idOrFilePath)) {
    db.query(
      "SELECT * FROM musics WHERE user_id = ? LIMIT ? OFFSET ?",
      [idOrFilePath, limit, offset],
      (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0)
          return res
            .status(404)
            .send("محصولی ایجاد نشده به صفحه ی ایجاد محصول بروید");
        res.json(results);
      }
    );
  } else {
    // اگر متن بود، براساس file_path جستجو شود
    const filePath = `uploads\\${idOrFilePath}`;
    db.query(
      "SELECT * FROM musics WHERE file_path = ? LIMIT ? OFFSET ?",
      [filePath, limit, offset],
      (err, results) => {
        if (err) {
          res.send("Error executing query:", err);
          return;
        }
        if (results.length === 0) {
          res.send("No results found.");
        } else {
          res.send(results);
        }
      }
    );
  }
});




// روت برای دریافت موزیک‌ها با نام آرتیست
app.get("/music/joinmusic", (req, res) => {
  db.query(
    `SELECT 
        m.title, 
        u.username AS artistName, 
        m.likeproduct, 
        m.type, 
        m.gener, 
        m.file_path, 
        m.file_pathtagMP3, 
				m.orginalPriceTanzim, 
				m.tempo,
				m.tozihat,
				discountPriceTanzim,
        view,
        sampleproduct,
        tanzim,
        sheroMelody,
        m.gammuisc 
     FROM 
        musics m
     JOIN 
        users u 
     ON 
        m.user_id = u.userID`,
    (err, results) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }

      // انطباق آدرس فایل
      const musicList = results.map((music) => ({
        ...music,
        file_path: `http://localhost:3000/${music.file_path}`, // اضافه کردن آدرس کامل
      }));

      res.json(musicList);
    }
  );
});

app.get("/oneUserMusics/:idOrFilePath", (req, res) => {
  const idOrFilePath = req.params.idOrFilePath;
  if (/^\d+$/.test(idOrFilePath)) {
    console.log(res)
  
    db.query(
      "SELECT * FROM musics WHERE user_id =  ?",
      [idOrFilePath],
      (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0)
          return res
            .status(404)
            .send(" محصولی ایجاد نشده به صفحه ی ایجاد محصول بروید");
        res.json(results);
      }
    );
  } else {
    // اگر متن بود، براساس file_path جستجو شود
    const filePath = `uploads\\${idOrFilePath}`;
    db.query(
      "SELECT * FROM musics WHERE file_path = ?",
      [filePath],
      (err, results) => {
        if (err) {
          return res.status(500).send("Error executing query: " + err);
        }
        if (results.length === 0) {
          return res.status(404).send("No results found.");
        } else {
          const musicFile = results[0]; 
         
          const fullFilePath = `http://localhost:3000/${musicFile.file_path}`; 
       
          res.setHeader('Content-Disposition', `attachment; filename="${musicFile.file_name}"`); 
          res.setHeader('Content-Type', '');
          res.sendFile(fullFilePath, (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error sending file.");
            }
          });
        }
      }
    );
  }
});


app.put("/musics/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  // فرض بر این است که شما از MySQL استفاده می‌کنید
  const { title, type, orginalPriceTanzim, discountPriceTanzim } = updatedData;

  // کوئری آپدیت
  const query = `
    UPDATE musics 
    SET 
      title = COALESCE(?, title),
      type = COALESCE(?, type),
      orginalPriceTanzim = COALESCE(?, orginalPriceTanzim),
      discountPriceTanzim = COALESCE(?, discountPriceTanzim),
      isShow = 1
    WHERE post_id = ?`;

    db.query(query, [title, type, orginalPriceTanzim, discountPriceTanzim, id], (err, result) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "خطای سرور در به‌روزرسانی" });
      }
      // پس از موفقیت، کل داده‌ها را برگردان
      db.query(`SELECT * FROM musics`, (err2, rows) => {
        if (err2) {
          console.error("Fetch error:", err2);
          return res.status(500).json({ message: "خطای سرور در دریافت داده‌ها" });
        }
        res.status(200).json({
          message: "به‌روزرسانی با موفقیت انجام شد",
          data: rows,
        });
      });
    });
  });



const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads/videos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const videoFileFilter = (req, file, cb) => {
  const filetypes = /mp4|mov|avi|mkv|webm/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only video files are allowed!');
  }
};

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024 // محدودیت حجم فایل: 500MB
  }
});


app.post("/video-upload", 
  uploadVideo.single("demoVideofile"), (req, res) => {
  // console.log(req.file)
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded or invalid file type' });
  }

  const {
    user_id,
    title,
    createat,
    tozihat,
    likeproduct,
    type,
    director,
    nameSdirector,
    actor,
    nameSactor,
    senarioWriter,
    nameSsenarioWriter,
    productionManager,
    nameSproductionManager,
    cinematographer,
    nameScinematographer,
    lightingDesigner,
    nameSlightingDesigner,
    makeUpArtist,
    nameSmakeUpArtist,
    setPlace,
    nameSsetPlace,
    costumeDesigner,
    nameScostumeDesigner,
    fieldSpesialEffectDesigner,
    nameSfieldSpesialEffectDesigner,
    visualEffectDseigner,
    nameSvisualEffectDseigner,
    edit,
    nameSedit,
    otherFactor,
    nameSotherFactor,
    cameraCount,
    cameraModel,
    lightingCount,
    lightingModel,
    moveMentEquipmentCranes,
    moveMentEquipmentHelishot,
    moveMentEquipmentRonin,
    moveMentEquipmentRail,
    otherEquipment,
    orginalPrice,
    discountPrice,
  } = req.body;
  const filepathImage = req.body.filepathImage;
  const demoVideofilePath = req.file.path;
  console.log(req.body)
  const relativeVideoPath = path.relative(__dirname, demoVideofilePath).replace(/\\/g, '/');
  // اعتبارسنجی فیلدهای ضروری
  if (!user_id || !title ) { // تغییر file_path به filepathImage
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const user_id_val = user_id || null;
  const title_val = title || null;
  const tozihat_val = tozihat || null;
  const likeproduct_val = likeproduct || null;
  const type_val = type || null;
  const director_val = director || null;
  const nameSdirector_val = nameSdirector || null;
  const actor_val = actor || null;
  const nameSactor_val = nameSactor || null;
  const senarioWriter_val = senarioWriter || null;
  const nameSsenarioWriter_val = nameSsenarioWriter || null;
  const productionManager_val = productionManager || null;
  const nameSproductionManager_val = nameSproductionManager || null;
  const cinematographer_val = cinematographer || null;
  const nameScinematographer_val = nameScinematographer || null;
  const lightingDesigner_val = lightingDesigner || null;
  const nameSlightingDesigner_val = nameSlightingDesigner || null;
  const makeUpArtist_val = makeUpArtist || null;
  const nameSmakeUpArtist_val = nameSmakeUpArtist || null;
  const setPlace_val = setPlace || null;
  const nameSsetPlace_val = nameSsetPlace || null;
  const costumeDesigner_val = costumeDesigner || null;
  const nameScostumeDesigner_val = nameScostumeDesigner || null;
  const fieldSpesialEffectDesigner_val = fieldSpesialEffectDesigner || null;
  const nameSfieldSpesialEffectDesigner_val = nameSfieldSpesialEffectDesigner || null;
  const visualEffectDseigner_val = visualEffectDseigner || null;
  const nameSvisualEffectDseigner_val = nameSvisualEffectDseigner || null;
  const edit_val = edit || null;
  const nameSedit_val = nameSedit || null;
  const otherFactor_val = otherFactor || null;
  const nameSotherFactor_val = nameSotherFactor || null;
  const cameraCount_val = cameraCount || null;
  const cameraModel_val = cameraModel || null;
  const lightingCount_val = lightingCount || null;
  const lightingModel_val = lightingModel || null;
  const moveMentEquipmentCranes_val = moveMentEquipmentCranes || null;
  const moveMentEquipmentHelishot_val = moveMentEquipmentHelishot || null;
  const moveMentEquipmentRonin_val = moveMentEquipmentRonin || null;
  const moveMentEquipmentRail_val = moveMentEquipmentRail || null;
  const otherEquipment_val = otherEquipment || null;
  const orginalPrice_val = orginalPrice || null;
  const discountPrice_val = discountPrice || null;
  // ذخیره اطلاعات ویدیو در پایگاه داده
  db.query(
    `INSERT INTO video_upload (
       user_id, title, filepathImage, createat, isShow, tozihat, likeproduct, type, director, nameSdirector,
      actor, nameSactor, senarioWriter, nameSsenarioWriter,
      productionManager, nameSproductionManager, cinematographer,
      nameScinematographer, lightingDesigner, nameSlightingDesigner,
      makeUpArtist, nameSmakeUpArtist, setPlace, nameSsetPlace,
      costumeDesigner, nameScostumeDesigner, fieldSpesialEffectDesigner,
      nameSfieldSpesialEffectDesigner, visualEffectDseigner,
      nameSvisualEffectDseigner, edit, nameSedit, otherFactor,
      nameSotherFactor, cameraCount, cameraModel, lightingCount,
      lightingModel, moveMentEquipmentCranes, moveMentEquipmentHelishot,
      moveMentEquipmentRonin, moveMentEquipmentRail, otherEquipment,
      orginalPrice, discountPrice, demoVideofile
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id_val,
      title_val,
      filepathImage,
      createat, 
      0, 
      tozihat_val,
      likeproduct_val,
      type_val,
      director_val,
      nameSdirector_val,
      actor_val,
      nameSactor_val,
      senarioWriter_val,
      nameSsenarioWriter_val,
      productionManager_val,
      nameSproductionManager_val,
      cinematographer_val,
      nameScinematographer_val,
      lightingDesigner_val,
      nameSlightingDesigner_val,
      makeUpArtist_val,
      nameSmakeUpArtist_val,
      setPlace_val,
      nameSsetPlace_val,
      costumeDesigner_val,
      nameScostumeDesigner_val,
      fieldSpesialEffectDesigner_val,
      nameSfieldSpesialEffectDesigner_val,
      visualEffectDseigner_val,
      nameSvisualEffectDseigner_val,
      edit_val,
      nameSedit_val,
      otherFactor_val,
      nameSotherFactor_val,
      cameraCount_val,
      cameraModel_val,
      lightingCount_val,
      lightingModel_val,
      moveMentEquipmentCranes_val,
      moveMentEquipmentHelishot_val,
      moveMentEquipmentRonin_val,
      moveMentEquipmentRail_val,
      otherEquipment_val,
      orginalPrice_val,
      discountPrice_val,
      relativeVideoPath
    ],
    (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      
      res.json({
        success: true,
        message: "Video uploaded successfully",
        videoId: result.insertId,
        filePath: filepathImage,
        videoPath: relativeVideoPath 
      });
    }
  );
});

app.get("/video/joinUser", (req, res) => {
  db.query(
    `SELECT 
      u.userID,
      u.username,
      u.email,
      u.mobilePhone,
      u.stadioAddress,
      v.createat,
      v.isShow,
      v.tozihat,
      v.type,
      v.orginalPrice,
      v.discountPrice,
      v.post_id,
      v.isShow
    FROM 
      video_upload v
    JOIN 
      users u 
    ON 
      v.user_id = u.userID`, 
    
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// خواندن همه ویدئوها

app.get("/videos", (req, res) => {
  db.query("SELECT * FROM video_upload", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//روت برای تک ویدیو
app.get("/videos/:id", (req, res) => {
  const  post_id = req.params.id;
  console.log(post_id)
  db.query(
    `SELECT 
    v.user_id,
    v.title,
    u.username,
    v.createat,
    v.isShow,
    v.tozihat,
    v.type,
    v.orginalPrice,
    v.discountPrice,
    v.post_id,
    v.isShow
  FROM 
    video_upload v
  JOIN 
    users u 
  ON 
    v.user_id = u.userID

    WHERE user_id = ?
    `  ,
    [post_id],
    (err,result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});

//روت برای تایید ادمین
app.put("/videoConfirmAdmin/:post_id", (req, res) => {
  const { post_id } = req.params;
  
  db.query(
    "UPDATE video_upload SET isShow = ? WHERE post_id = ?", 
    [1, post_id], 
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("ویدیو با موفیقت تایید شد");
    }
  );
});

// حذف ویدئو
app.delete("/video/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM video_upload WHERE video_id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Video deleted successfully");
  });
});



// راه‌اندازی سرور
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
