export enum URLs {
    // Client Server
    ORIGIN_SERVER = 'http://localhost:3001',
    ORIGIN_CLIENT = 'http://localhost:5173',

    // ----- POST -------
    POST_SIGINUP = '/signup',
    POST_SIGINUP_EMAILCHECK = '/signup-checkemail',
    POST_SIGNIN = '/signin',
    POST_INSERATE_CAR = '/inseratecar',
    POST_INSERATE_FINISH = '/inseratecar/finish',
    POST_INSERT_BRAND = '/admin/insertbrand',
    POST_INSERT_MODEL = '/admin/insertmodel',
    POST_PUBLISH = '/admin/publish',

    // ----- GET --------
    FETCH_BRAND = '/fetch-brand',
    FETCH_MODEL = '/fetch-model',
    FETCH_BAUREIHE = '/fetchbaureihe',
    FETCH_CARS = '/fetch-cars',
    SEARCH_DATAS = '/fetch-staticdata',
    FETCH_INSERATE_PUBLISH = '/fetch-inserate-publish',
    FETCH_DETAIL_SEARCH = '/detailsuche',
    HOME_ALL_SEARCH_COUNT = '/',
    GET_CHECK_AUTH = '/api/checkAuth',
    FETCH_COUNT = '/search/count/all',
    FETCH_CLICKED_CARS =  '/search/most-clicked',
    UPLOAD = '/upload',
    IMAGE_PATH = '/uploads',
    FETCH_IMAGENAMES = '/fetch-imagenames',
    FETCH_IMAGENAME = '/fetch-imagename',
    FETCH_BUNDESLAENDER = "/fetch-bundeslaender",
    FETCH_LIST_CARS = "/listcars",
    LOGOUT = '/logout',
    AUTHENTICATION_USER = "/authenticate-user",

    // ----- GET --------
    DELETE_IMAGE = '/delete'
}