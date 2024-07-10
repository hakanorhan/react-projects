export enum CheckBoxID {
    IS_CHECKED_EMAIL = 'isCheckedEmail',
    IS_CHECKED_TELEFON = 'isCheckedTelefon',
    IS_CHECKED_DEALER = 'isCheckedDealer'
}

export enum DisplayTypes {
    ELECTRIC = 'electric',
    MOST_CLICKED = 'mostClicked'
}

export enum Roles {
    ADMIN = "admin",
    USER = "user",
    NULL = "null"
}

export enum Company {
    COMPANYNAME = "CARS"
}

export enum FieldId{
    SIGNUP_TEXTFIELD_NAME = "signupnName",
    SIGNUP_TEXTFIELD_FAMILYNAME = "signupFamilyname",
    SIGNUP_TEXTFIELD_EMAIL = "signupEmail",
    SIGNUP_TEXTFIELD_PASSWORD = "signupPassword",
    SIGNUP_TEXTFIELD_PASSWORD2 = "signupPassword2",

    SIGNIN_TEXTFIELD_EMAIL = "signinEmail",
    SIGNIN_TEXTFIELD_PASSWORD = "signinPassword"
}

export enum Images {
    MAX_SIZE_IMAGE = 2
}

export enum SearchType {
    SHOW_NEW ="show new", SORT="sort", FIRST="first"
}

export enum SelectFieldEnums {
    ALL_VALUE = "select-all-optional",
    DE_ALL_LABEL = ' Beliebig ',
    ITEM_KEY = "beliebig-option"
}

export enum SortEnums {
    EZ_UP = "ez_up", EZ_DOWN = "ez_down", KM_UP = "kmup", KM_DOWN = "kmdown", INSREATE_UP = "inserateup", INSREATE_DOWN = "inseratedown",
    POWER_UP = "power_up", POWER_DOWN = "powerdown", PRICE_UP = "priceup", PRICE_DOWN = "pricedown"
}

export enum TextFieldID {
    NAME = "name",
    FAMILYNAME = "familyname",
    COMPANYNAME = "companyname",
    EMAIL = "email",
    PASSWORD1 = "password1",
    PASSWORD2 = "password2",
    TEL_NR = "telNr",
    BIRTH ="birth",
    BUNDESLAND = "bundesland",
    STREET = "street",
    NR = "nr",
    ZIPCODE = "zipcode",
    CITY = "city",
    ISCARDEALER = "isCarDealer",
    ISCHAT = "isChat",
    ISTELEFON = "isTelefon",
    ISEMAIL = "esEmail",
    IMPRESSUMDATEN = "impressumdaten"
}

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
    FETCH_INSERATE_PUBLISH = '/admin/fetch-inserate-publish',
    FETCH_DETAIL_SEARCH = '/detailsuche',
    FETCH_DETAIL_VIEW_ADMIN = '/admin/detailview',
    HOME_ALL_SEARCH_COUNT = '/',
    GET_CHECK_AUTH = '/api/checkAuth',
    FETCH_COUNT = '/search/count/all',
    FETCH_CLICKED_CARS = '/search/most-clicked',
    FETCH_CLICKED_CARS_COUNT = '/search/most-clicked-count',
    UPLOAD = '/upload',
    IMAGE_PATH = '/uploads',
    FETCH_IMAGENAMES = '/fetch-imagenames',
    FETCH_IMAGENAME = '/fetch-imagename',
    FETCH_BUNDESLAENDER = "/fetch-bundeslaender",
    FETCH_LIST_CARS = "/listcars",
    LOGOUT = '/logout',
    AUTHENTICATION_USER = "/authenticate-user",
    ACCESS_DENIED = '/access-denied',

    // ----- GET --------
    DELETE_IMAGE = '/delete'
}