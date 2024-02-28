import type { Locale } from '@uppy/utils/lib/Translator'

const fa_IR: Locale<0 | 1> = {
  strings: {},
  pluralize (n) {
    if (n === 1) {
      return 0
    }
    return 1
  },
}

fa_IR.strings = {
  addBulkFilesFailed: {
    '0': 'افزودن %{smart_count} فایل به دلیل خطای داخلی با شکست مواجه شد',
    '1': 'افزودن %{smart_count} فایل به دلیل خطاهای داخلی با شکست مواجه شد',
  },
  addedNumFiles: '%{numFiles} فایل اضافه شد',
  addingMoreFiles: 'درحال افزودن فایل‌ها',
  additionalRestrictionsFailed: '%{count} محدودیت اضافی رعایت نشد',
  addMore: 'اضافه کردن بیشتر',
  addMoreFiles: 'افزودن فایل‌های بیشتر',
  allFilesFromFolderNamed: 'همه فایل‌ها از پوشه %{name}',
  allowAccessDescription:
    'برای گرفتن عکس یا ضبط ویدیو با دوربین خود، لطفاً اجازه دسترسی به دوربین را برای این سایت بدهید.',
  allowAccessTitle: 'لطفا به دوربین اجازه‌ی دسترسی بدهید',
  allowAudioAccessDescription:
    'برای ضبط صدا، لطفاً اجازه دسترسی به میکروفون را برای این سایت بدهید.',
  allowAudioAccessTitle: 'لطفا اجازه دسترسی به میکروفون خود را بدهید',
  aspectRatioLandscape: 'برش منظره (16:9)',
  aspectRatioPortrait: 'برش پرتره (9:16)',
  aspectRatioSquare: 'برش مربعی',
  authAborted: 'احراز هویت لغو شد',
  authenticateWith: 'در حال اتصال به %{pluginName}',
  authenticateWithTitle: 'احراز هویت %{pluginName} برای انتخاب فایل ضروریست!',
  back: 'بازگشت',
  browse: 'انتخاب کنید',
  browseFiles: 'انتخاب فایل',
  browseFolders: 'انتخاب فولدر',
  cancel: 'انصراف',
  cancelUpload: 'لغو بارگذاری',
  chooseFiles: 'انتخاب فایل',
  closeModal: 'بستن پنجره',
  companionError: 'اتصال با طرق مقابل با شکست روبرو شد',
  companionUnauthorizeHint:
    'برای قطع احراز هویت حساب %{provider}, لطفا به آدرس %{url} بروید',
  complete: 'کامل شد',
  compressedX: '%{size} با فشرده‌سازی تصاویر ذخیره شد',
  compressingImages: 'فشرده سازی تصاویر ...',
  connectedToInternet: 'به اینترنت متصل شد',
  copyLink: 'کپی پیوند',
  copyLinkToClipboardFallback: 'پیوند زیر را کپی کنید',
  copyLinkToClipboardSuccess: 'پیوند به حافظه‌ی موقت منتقل شد',
  creatingAssembly: 'درحال آماده سازی برای بارگذاری',
  creatingAssemblyFailed: 'Transloadit: اسمبلی ایجاد نشد',
  dashboardTitle: 'بارگذاری فایل',
  dashboardWindowTitle: 'پنجره بارگذاری فایل. برای لغو کلید esc را بفشارید',
  dataUploadedOfTotal: '%{complete} از %{total}',
  discardRecordedFile: 'دورانداختن فایل ضبط شده',
  done: 'انجام شد',
  dropHereOr: 'فایل را بکشید و اینجا رها کنید یا  %{browse}',
  dropHint: 'فایل‌ها را بکشید و اینجا رها کنید',
  dropPasteBoth: 'فایل‌ها را اینجا رها کنید، بچسبانید یا  %{browse}',
  dropPasteFiles: 'فایل‌ها را اینجا رها کنید، بچسبانید یا  %{browse}',
  dropPasteFolders: 'فایل‌ها را اینجا رها کنید، بچسبانید یا  %{browse}',
  dropPasteImportBoth: 'فایل‌ها را اینجا رها کنید، بچسبانید یا %{browse}',
  dropPasteImportFiles: 'فایل‌ها را اینجا رها کنید، بچسبانید یا %{browse}',
  dropPasteImportFolders: 'فایل‌ها را اینجا رها کنید، بچسبانید یا %{browse}',
  editFile: 'ویرایش فایل',
  editImage: 'ویرایش تصویر',
  editFileWithFilename: 'ویرایش فایل %{file}',
  editing: 'در حال ویرایش %{file}',
  emptyFolderAdded: 'از پوشه‌ی خالی هیچ فایلی افزوده نشد',
  encoding: 'رمزگذاری...',
  enterCorrectUrl:
    'آدرس نامعتبر. لطفا مطمئن شوید که آدرس مستقیم به یک فایل را انتخاب کرده‌اید.',
  enterTextToSearch: 'متن را جهت جستجوی تصویر وارد کنید',
  enterUrlToImport: 'آدرس فایل را برای بارگذاری بنویسید',
  error: 'خطا',
  exceedsSize: 'اندازه‌ی این فایل از حد مجاز بیشتر است! %{size}',
  failedToFetch:
    'Companion نتوانست این URL را واکشی کند، لطفاً مطمئن شوید که درست است',
  failedToUpload: 'شکست در بارگذاری %{file}',
  filesUploadedOfTotal: {
    '0': '%{complete} از %{smart_count} فایل بارگذاری شد.',
    '1': '%{complete} از %{smart_count} فایل بارگذاری شد.',
  },
  filter: 'پالایش',
  finishEditingFile: 'اتمام ویرایش فایل',
  flipHorizontal: 'چرخاندن کردن افقی',
  folderAdded: {
    '0': '%{smart_count} فایل از %{folder} افزوده شد.',
    '1': '%{smart_count} فایل از %{folder} افزوده شد.',
  },
  folderAlreadyAdded: 'پوشه "%{folder}" قبلاً اضافه شده است',
  generatingThumbnails: 'تولید تصویر بندانگشتی...',
  import: 'واردکردن',
  importFiles: 'وارد کردن فایل‌ها از:',
  importFrom: 'واردکردن از %{name}',
  inferiorSize: 'این فایل کوچک‌تر از اندازه مجاز %{size} است',
  loadedXFiles: '%{numFiles} فایل بارگیری شد',
  loading: 'درحال بارگذاری',
  logOut: 'خروج',
  micDisabled: 'عدم اجازه دسترسی توسط کاربر',
  missingRequiredMetaField: 'فیلدهای متا لازم وجود ندارد',
  missingRequiredMetaFieldOnFile: 'فیلدهای متا لازم در %{fileName} وجود ندارد',
  missingRequiredMetaFields: {
    '0': 'فیلد متا الزامی وجود ندارد: %{fields}.',
    '1': 'فیلدهای متا لازم وجود ندارد: %{fields}.',
  },
  myDevice: 'دستگاه من',
  noAudioDescription:
    'برای ضبط صدا، لطفاً یک میکروفون یا دستگاه ورودی صوتی دیگری را وصل کنید',
  noAudioTitle: 'میکروفون در دسترس نیست',
  noCameraDescription: 'جهت گرفتن عکس یا ضبط ویدیو لطفا یک دوربین متصل نمایید',
  noCameraTitle: 'دوربین در دسترس نیست',
  noDuplicates:
    "نمی‌توان فایل تکراری بارگذاری کرد،'%{fileName}' قبلا بارگذاری شده است.",
  noFilesFound: 'هیچ فایل یا پوشه‌ای اینجا ندارید',
  noInternetConnection: 'عدم اتصال به اینترنت',
  noMoreFilesAllowed: 'نمی توان فایل جدید بارگذاری کرد',
  noSearchResults: 'متاسفانه هیچ نتیجه ای برای این جستجو وجود ندارد',
  openFolderNamed: 'پوشه باز کنید %{name}',
  pause: 'توقف',
  paused: 'متوقف شده',
  pauseUpload: 'توقف بارگذاری',
  pluginNameAudio: 'صدا',
  pluginNameBox: 'جعبه',
  pluginNameCamera: 'دوربین',
  pluginNameDropbox: 'دراپ باکس',
  pluginNameFacebook: 'فیس بوک',
  pluginNameGoogleDrive: 'درایو گوگل',
  pluginNameInstagram: 'اینستاگرام',
  pluginNameOneDrive: 'OneDrive',
  pluginNameZoom: 'بزرگ‌نمایی',
  poweredBy: 'قدرت گرفته از %{uppy}',
  processingXFiles: {
    '0': 'درحال پردازش %{smart_count} فایل',
    '1': 'درحال پردازش %{smart_count} فایل',
  },
  recording: 'درحال ضبط',
  recordingLength: 'مدت ضبط شده %{recording_length}',
  recordingStoppedMaxSize:
    'ضبط به دلیل رسیدن اندازه فایل به حدود حداکثر اندازه مجاز متوقف شد',
  recordVideoBtn: 'ضبط تصویر',
  recoveredAllFiles:
    'ما همه فایل‌ها را بازیابی کردیم. اکنون می توانید بارگذاری را از سر بگیرید.',
  recoveredXFiles: {
    '0': 'امکان بازیابی %{smart_count} فایل وجود ندارد. لطفا مجددا انتخابش کنید و بارگذاری را ازسر بگیرید.',
    '1': 'امکان بازیابی %{smart_count} فایل‌ها وجود ندارد. لطفا مجددا انتخابش کنید و بارگذاری را ازسر بگیرید.',
  },
  removeFile: 'حذف فایل',
  reSelect: 'انتخاب مجدد',
  resetFilter: 'بازنشانی فیلتر',
  resetSearch: 'بازنشانی جستجو',
  resume: 'ادامه',
  resumeUpload: 'ادامه بارگذاری',
  retry: 'تلاش دوباره',
  retryUpload: 'تلاش دوباره بارگذاری',
  revert: 'Revert',
  rotate: 'چرخاندن',
  save: 'ذخیره',
  saveChanges: 'ذخیره‌ی تغییرات',
  search: 'Search',
  searchImages: 'جستجو برای تصاویر',
  selectX: {
    '0': 'را انتخاب کنید %{smart_count}',
    '1': 'را انتخاب کنید %{smart_count}',
  },
  sessionRestored: 'نشست بازیابی شد',
  showErrorDetails: 'نمایش جزئیات خطا',
  signInWithGoogle: 'با گوگل وارد شوید',
  smile: 'لبخند!',
  startAudioRecording: 'شروع ضبط صدا',
  startCapturing: 'ضبط صفحه نمایش آغاز شد',
  startRecording: 'آغاز تصویربرداری',
  stopAudioRecording: 'ضبط صدا را متوقف کنید',
  stopCapturing: 'ضبط صفحه نمایش متوقف شد',
  stopRecording: 'توقف تصویربرداری',
  streamActive: 'جریان فعال',
  streamPassive: 'جریان غیرفعال',
  submitRecordedFile: 'ارسال فایل ضبط شده',
  takePicture: 'عکس بگیرید',
  takePictureBtn: 'عکس بگیر',
  timedOut: 'بارگذاری به مدت %{seconds} ثانیه متوقف شد, درحال متوقف کردن.',
  upload: 'بارگذاری',
  uploadComplete: 'بارگذاری انجام شد',
  uploadFailed: 'بارگذاری شکست خورد',
  uploading: 'بارگذاری',
  uploadXFiles: {
    '0': 'بارگذاری %{smart_count} فایل',
    '1': 'بارگذاری %{smart_count} فایل',
  },
  uploadPaused: 'بارگذاری متوقف شد',
  uploadStalled:
    'آپلود برای %{seconds} ثانیه هیچ پیشرفتی نداشته است. ممکن است بخواهید دوباره آن را امتحان کنید.',
  uploadXNewFiles: {
    '0': 'بارگذاری +%{smart_count} فایل',
    '1': 'بارگذاری +%{smart_count} فایل',
  },
  uploadingXFiles: {
    '0': 'بارگذاری %{smart_count} فایل',
    '1': 'بارگذاری %{smart_count} فایل',
  },
  xFilesSelected: {
    '0': '%{smart_count} فایل انتخاب شده',
    '1': '%{smart_count} فایل انتخاب شده',
  },
  xMoreFilesAdded: {
    '0': '%{smart_count} فایل دیگر افزوده شد',
    '1': '%{smart_count} فایل دیگر افزوده شد',
  },
  xTimeLeft: '%{time} left',
  youCanOnlyUploadFileTypes: 'فایل‌های قابل قبول: %{types}',
  youCanOnlyUploadX: {
    '0': 'فقط می‌توانید %{smart_count} فایل انتخاب کنید',
    '1': 'فقط می‌توانید %{smart_count} فایل انتخاب کنید',
  },
  youHaveToAtLeastSelectX: {
    '0': 'می‌بایست حداقل %{smart_count} فایل انتخاب کنید',
    '1': 'می‌بایست حداقل %{smart_count} فایل انتخاب کنید',
  },
  zoomIn: 'بزرگ‌نمایی',
  zoomOut: 'کوچک‌نمایی',
}

// TODO: remove this in the next major?
// @ts-expect-error Uppy can be a global in legacy bundle
if (typeof Uppy !== 'undefined') {
  // @ts-expect-error Uppy can be a global in legacy bundle
  globalThis.Uppy.locales.fa_IR = fa_IR
}
export default fa_IR
