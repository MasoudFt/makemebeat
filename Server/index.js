const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // استخراج توکن از هدر
console.log(token)
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ذخیره اطلاعات کاربر در درخواست
    next(); // ادامه اجرای میدلور
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(400).send("Invalid token.");
  }
};



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    const destinationMap = {
      'coverImage': 'uploads/musics/Cover',
      'productImage': 'uploads/musics/productImage',
    
    };
   
    const destinationPath = destinationMap[file.fieldname] || 'uploads/musics';
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, file.originalname);
  }
});

const uploadMusic = multer({ storage })
const upload2 = multer({ storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ایجاد pool برای مدیریت اتصالات
const pool = mysql.createPool({
  uri:process.env.MYSQL2_URI
});

// ثبت نام کاربر
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
    
    // تعیین خریدار و فروشنده
    const buyer = type === true || type === "true" ? 1 : 0;
    const seller = !buyer ? 1 : 0;

    const query = `
      INSERT INTO users (username, email, password, mobilePhone, name, family, buyer, seller, profile_path) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL) 
    `;

    const connection = await pool.getConnection(); // دریافت یک اتصال
    await connection.query(query, [username, email, hashedPassword, mobile, name, family, buyer, seller]);
    connection.release(); // آزاد کردن اتصال

    res.send("User created successfully");
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ message: "Server error" });
  }
});

// به روزرسانی پروفایل کاربر
app.put("/users/update/:userId", upload2.single('image'), async (req, res) => {
  const userId = req.params.userId;
  let profilePath = req.file ? req.file.path : null; // مسیر عکس بارگذاری شده

  if (!profilePath) {
    return res.status(400).send({ message: "No image uploaded" });
  }

  const query = `UPDATE users SET profile_path = ? WHERE userID = ?`;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [profilePath, userId]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Server error" });
  }
});




// ورود کاربر
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
console.log(email)
console.log(password)
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    connection.release();

    if (results.length === 0) {
      return res.status(401).send("User not found Back to Register");
    }
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET, { expiresIn: "7D" });
    res.json({ token, userId: user.userID, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send("Internal Server Error");
  }
});

// خواندن تمام کاربران
app.get("/users", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query("SELECT * FROM users");
    connection.release();
    res.json(results);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Internal Server Error");
  }
});

// خواندن تک کاربر
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query("SELECT userID, username, name, mobilePhone, email, buyer, seller, profile_path, createdAt FROM users WHERE userID = ?", [userId]);
    connection.release();

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// بارگذاری موزیک
app.post("/musics", uploadMusic.fields([
  { name: "productImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "demoMP3File", maxCount: 1 },
  { name: "mainMP3File", maxCount: 1 },
  { name: "tagMP3File", maxCount: 1 },
  { name: "waveFile", maxCount: 1 },
  { name: "projectFile", maxCount: 1 }
]), async (req, res) => {
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

  const file_pathImage = req.files.productImage?.[0]?.path || null;
  const file_typeImage = req.files.productImage?.[0]?.mimetype || null;
  const file_pathMP3demo = req.files.demoMP3File?.[0]?.path || null;
  const file_typeMP3demo = req.files.demoMP3File?.[0]?.mimetype || null;
  const file_pathMP3Orginal = req.files.mainMP3File?.[0]?.path || null;
  const file_typeMP3Orginal = req.files.mainMP3File?.[0]?.mimetype || null;
  const file_pathtagMP3 = req.files.tagMP3File?.[0]?.path || null;
  const file_typetagMP3 = req.files.tagMP3File?.[0]?.mimetype || null;
  const file_pathWave = req.files.waveFile?.[0]?.path || null;
  const file_typeWave = req.files.waveFile?.[0]?.mimetype || null;
  const file_pathProjectLine = req.files.projectFile?.[0]?.path || null;
  const file_typeProjectLine = req.files.projectFile?.[0]?.mimetype || null;
  const file_pathCoverSample = req.files.coverImage?.[0]?.path || null;

  const query = `
    INSERT INTO musics 
    (user_id, title, file_pathImage, file_typeImage, cover_path, createat, view, likeproduct, post_id, sheroMelody, tanzim, sampleproduct, type, gener, gammuisc, tempo, tozihat, file_pathMP3demo, file_typeMP3demo, file_pathMP3Orginal, file_typeMP3Orginal, file_pathtagMP3, file_typetagMP3, file_pathWave, file_typeWave, file_pathProjectLine, file_typeProjectLine, orginalPriceTanzim, discountPriceTanzim, isShow) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const connection = await pool.getConnection();
    await connection.query(query, [
      user_id || null,
      title || null,
      file_pathImage,
      file_typeImage,
      file_pathCoverSample,
      createat || null,
      view || null,
      likeproduct || null,
      post_id || null,
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
      file_typetagMP3,
      file_pathWave,
      file_typeWave,
      file_pathProjectLine,
      file_typeProjectLine,
      orginalPriceTanzim || null,
      discountPriceTanzim || null,
      0 // مقدار isShow همیشه 0
    ]);
    connection.release();
    res.send({ status: 201, message: "بارگذاری موسیقی با موفقیت انجام شد" });
  } catch (err) {
    console.error("Error inserting music:", err);
    return res.status(500).send("Error uploading music.");
  }
});

// دانلود فایل موزیک بر اساس ID
app.get('/download/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(`
      SELECT 
          m.title, 
          m.file_pathMP3Orginal, 
          m.file_typeMP3Orginal 
       FROM 
          musics m
       WHERE 
          m.post_id = ?`, 
    [fileId]);
    connection.release();

    if (results.length === 0) {
      return res.status(404).send('File not found.');
    }

    const file = results[0];
    const filePath = path.join(__dirname, file.file_pathMP3Orginal);
    const fileExtension = path.extname(file.file_pathMP3Orginal);
    let contentType = 'application/octet-stream';

    switch (fileExtension) {
      case '.mp3':
        contentType = 'audio/mpeg';
        break;
      case '.wav':
        contentType = 'audio/wav';
        break;
      default:
        contentType = 'application/octet-stream';
    }
    
    res.setHeader('Content-Type', contentType);
    const downloadFileName = `${file.title}${fileExtension}`;
    res.download(filePath, downloadFileName);
  } catch (err) {
    console.error('Error retrieving file data:', err);
    return res.status(500).send('Error retrieving file data.');
  }
});


// روت برای دریافت موزیک‌ها بر اساس نوع
app.get("/musics/like/:type", async (req, res) => {
  const type = req.params.type;

  if (!type) {
    return res.status(400).send("لطفاً ژانر را مشخص کنید.");
  }

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(
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
          m.discountPriceTanzim,
          m.view,
          m.sampleproduct,
          m.tanzim,
          m.sheroMelody,
          m.gammuisc 
       FROM 
          musics m
       JOIN 
          users u ON m.user_id = u.userID 
       WHERE 
          m.type LIKE ?`, [`%${type}%`] // جستجو با استفاده از LIKE
    );
    connection.release();

    if (results.length === 0) {
      return res.status(404).send("سبک مشابه ای  پیدا نشد.");
    }

    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(500).send("خطا در اجرای کوئری");
  }
});

// خواندن همه موزیک‌ها
app.get("/musics", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(
      `SELECT 
          m.title, 
          u.username AS artistName, 
          m.likeproduct, 
          m.type, 
          m.gener, 
          m.file_pathImage, 
          m.cover_path, 
          m.orginalPriceTanzim, 
          m.tempo,
          m.post_id,
          m.tozihat, 
          m.file_pathtagMP3, 
          m.file_pathMP3Orginal, 
          m.discountPriceTanzim,
          m.view,
          m.sampleproduct,
          m.tanzim,
          m.sheroMelody,
          m.gammuisc 
       FROM 
          musics m
       JOIN 
          users u ON m.user_id = u.userID`
    );
    connection.release();

    const musicList = results.map((music) => ({
      ...music,
      // اگر نیاز است که مسیر فایل را به آدرس کامل اضافه کنید، این خط را uncomment کنید
      // file_path: `http://localhost:3000/${music.file_path}`,
    }));

    res.json(musicList);
  } catch (error) {
    console.error('Error fetching musics:', error);
    res.status(500).send("Internal Server Error");
  }
});

// خواندن موزیک‌ها با pagination
app.get("/musics/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query("SELECT * FROM musics LIMIT ? OFFSET ?", [limit, offset]);
    connection.release();

    const musicList = results.map((music) => ({
      ...music,
      file_path: `http://localhost:3000/${music.file_path}`, // اضافه کردن آدرس کامل در صورت نیاز
    }));

    res.json(musicList);
  } catch (err) {
    console.error('Error fetching paginated musics:', err);
    return res.status(500).send(err);
  }
});

// جستجو بر اساس id یا filePath موزیک‌ها
app.get("/musics/:idOrFilePath/:page/", async (req, res) => {
  const idOrFilePath = req.params.idOrFilePath;
  const page = parseInt(req.params.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const connection = await pool.getConnection();

    if (/^\d+$/.test(idOrFilePath)) {
      const [results] = await connection.query(
        "SELECT * FROM musics WHERE user_id = ? LIMIT ? OFFSET ?",
        [idOrFilePath, limit, offset]
      );

      if (results.length === 0)
        return res.status(404).send("محصولی ایجاد نشده به صفحه ی ایجاد محصول بروید");
      
      res.json(results);
    } else {
      const filePath = `uploads/${idOrFilePath}`;
      const [results] = await connection.query(
        "SELECT * FROM musics WHERE file_path = ? LIMIT ? OFFSET ?",
        [filePath, limit, offset]
      );

      if (results.length === 0) {
        return res.status(404).send("No results found.");
      } else {
        res.json(results);
      }
    }
    connection.release();
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send("Error executing query");
  }
});

// روت برای دریافت موزیک‌ها با نام آرتیست
app.get("/music/joinmusic", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(
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
          m.discountPriceTanzim,
          m.view,
          m.sampleproduct,
          m.tanzim,
          m.sheroMelody,
          m.gammuisc 
      FROM 
          musics m
      JOIN 
          users u ON m.user_id = u.userID`
    );
    connection.release();

    const musicList = results.map((music) => ({
      ...music,
      file_path: `http://localhost:3000/${music.file_path}`, // اضافه کردن آدرس کامل
    }));

    res.json(musicList);
  } catch (err) {
    console.error("Error fetching music:", err);
    res.status(500).send("Internal Server Error");
  }
});

// خواندن موزیک‌های یک کاربر بر اساس ID
app.get("/oneUserMusics/:idOrFilePath", async (req, res) => {
  const idOrFilePath = req.params.idOrFilePath;

  try {
    const connection = await pool.getConnection();
    if (/^\d+$/.test(idOrFilePath)) {
      const [results] = await connection.query(
        "SELECT * FROM musics WHERE user_id = ?",
        [idOrFilePath]
      );

      if (results.length === 0) {
        return res.status(404).send("محصولی ایجاد نشده به صفحه ی ایجاد محصول بروید");
      }
      res.json(results);
    } else {
      const filePath = `uploads/${idOrFilePath}`;
      const [results] = await connection.query(
        "SELECT * FROM musics WHERE file_path = ?",
        [filePath]
      );

      if (results.length === 0) {
        return res.status(404).send("No results found.");
      } else {
        res.json(results); // فرستادن نتایج
      }
    }
    connection.release();
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send("Error executing query");
  }
});

// به روزرسانی موزیک
app.put("/musics/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const { title, type, orginalPriceTanzim, discountPriceTanzim } = updatedData;

  const query = `
    UPDATE musics 
    SET 
      title = COALESCE(?, title),
      type = COALESCE(?, type),
      orginalPriceTanzim = COALESCE(?, orginalPriceTanzim),
      discountPriceTanzim = COALESCE(?, discountPriceTanzim),
      isShow = 1
    WHERE post_id = ?`;

  try {
    const connection = await pool.getConnection();
    await connection.query(query, [title, type, orginalPriceTanzim, discountPriceTanzim, id]);
    connection.release();

    const [updatedResults] = await connection.query(`SELECT * FROM musics`);
    res.status(200).json({
      message: "به‌روزرسانی با موفقیت انجام شد",
      data: updatedResults,
    });
    
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "خطای سرور در به‌روزرسانی" });
  }
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


app.post("/video_upload", uploadVideo.fields([
  { name: "demoVideofile", maxCount: 1 },
  { name: "filepathImage", maxCount: 1 } // Assuming you might also have an image upload field.
]), async (req, res) => {
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
    visualEffectDesigner,
    nameSvisualEffectDesigner,
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

  const demoVideofilePath = req.files.demoVideofile?.[0]?.path || null;
  const filepathImage = req.files.filepathImage?.[0]?.path || null; // Adding image path extraction

  const relativeVideoPath = demoVideofilePath ? path.relative(__dirname, demoVideofilePath).replace(/\\/g, '/') : null;

  // Validation for mandatory fields
  if (!user_id || !title || !demoVideofilePath) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO video_upload (
       user_id, title, filepathImage, createat, isShow, tozihat, likeproduct, type, director, nameSdirector,
      actor, nameSactor, senarioWriter, nameSsenarioWriter,
      productionManager, nameSproductionManager, cinematographer,
      nameScinematographer, lightingDesigner, nameSlightingDesigner,
      makeUpArtist, nameSmakeUpArtist, setPlace, nameSsetPlace,
      costumeDesigner, nameScostumeDesigner, fieldSpesialEffectDesigner,
      nameSfieldSpesialEffectDesigner, visualEffectDesigner,
      nameSvisualEffectDesigner, edit, nameSedit, otherFactor,
      nameSotherFactor, cameraCount, cameraModel, lightingCount,
      lightingModel, moveMentEquipmentCranes, moveMentEquipmentHelishot,
      moveMentEquipmentRonin, moveMentEquipmentRail, otherEquipment,
      orginalPrice, discountPrice, demoVideofile
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const connection = await pool.getConnection();
    await connection.query(query, [
      user_id || null,
      title || null,
      filepathImage,
      createat,
      0, // Assuming isShow is set to 0 by default
      tozihat || null,
      likeproduct || null,
      type || null,
      director || null,
      nameSdirector || null,
      actor || null,
      nameSactor || null,
      senarioWriter || null,
      nameSsenarioWriter || null,
      productionManager || null,
      nameSproductionManager || null,
      cinematographer || null,
      nameScinematographer || null,
      lightingDesigner || null,
      nameSlightingDesigner || null,
      makeUpArtist || null,
      nameSmakeUpArtist || null,
      setPlace || null,
      nameSsetPlace || null,
      costumeDesigner || null,
      nameScostumeDesigner || null,
      fieldSpesialEffectDesigner || null,
      nameSfieldSpesialEffectDesigner || null,
      visualEffectDesigner || null,
      nameSvisualEffectDesigner || null,
      edit || null,
      nameSedit || null,
      otherFactor || null,
      nameSotherFactor || null,
      cameraCount || null,
      cameraModel || null,
      lightingCount || null,
      lightingModel || null,
      moveMentEquipmentCranes || null,
      moveMentEquipmentHelishot || null,
      moveMentEquipmentRonin || null,
      moveMentEquipmentRail || null,
      otherEquipment || null,
      orginalPrice || null,
      discountPrice || null,
      relativeVideoPath
    ]);
    connection.release();
    res.json({
      success: true,
      message: "Video uploaded successfully",
      filePath: filepathImage,
      videoPath: relativeVideoPath
    });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get video uploads along with user details
app.get("/video/joinUser", async (req, res) => {
  const query = `
    SELECT 
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
      v.post_id
    FROM 
      video_upload v
    JOIN 
      users u 
    ON 
      v.user_id = u.userID`;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(query);
    connection.release();
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get all videos
app.get("/videos", async (req, res) => {
  const query = "SELECT * FROM video_upload";
  
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(query);
    connection.release();
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get a single video by ID
app.get("/videos/:id", async (req, res) => {
  const user_id = req.params.id;
  const query = `
    SELECT 
      v.user_id,
      v.title,
      v.createat,
      v.isShow,
      v.likeproduct,
      v.tozihat,
      v.type,
      v.orginalPrice,
      v.discountPrice,
      v.post_id
    FROM 
      video_upload v
    JOIN 
      users u 
    ON 
      v.user_id = u.userID
    WHERE 
      v.user_id = ?`;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [user_id]);
    connection.release();
    res.json(result);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Confirm video by admin
app.put("/videoConfirmAdmin/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  
  const query = "UPDATE video_upload SET isShow = ? WHERE post_id = ?";

  try {
    const connection = await pool.getConnection();
    await connection.query(query, [1, post_id]);
    connection.release();
    res.send("ویدیو با موفقیت تایید شد");
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Delete a video
app.delete("/video/:id", async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM video_upload WHERE post_id = ?";

  try {
    const connection = await pool.getConnection();
    await connection.query(query, [id]);
    connection.release();
    res.send("Video deleted successfully");
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});



// راه‌اندازی سرور
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
