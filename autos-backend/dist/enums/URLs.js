export var URLs;
(function (URLs) {
    URLs["ORIGIN_SERVER"] = "http://localhost:3001";
    URLs["ORIGIN_CLIENT"] = "http://localhost:5173";
    URLs["FETCH_BRAND"] = "/fetchbrand";
    URLs["FETCH_MODEL"] = "/fetchmodel";
    URLs["FETCH_BAUREIHE"] = "/fetchbaureihe";
    URLs["FETCH_BAUREIHE_MODEL"] = "/baureihemodel";
    URLs["FETCH_INSERATE_DATA"] = "/inseratedata";
    URLs["POST_SIGINUP"] = "/signup";
    URLs["POST_SIGNIN"] = "/signin";
    URLs["POST_INSERT_BAUREIHE"] = "/admin/writebaueihe";
    URLs["POST_INSERATE_CAR"] = "/inseratecar";
    URLs["ALL_FAST_SEARCH_FIRST"] = "/fastsearchfirst";
    URLs["GET_CHECK_AUTH"] = "/api/checkAuth";
    URLs["POST_WRITE_BRAND"] = "/admin/writebrand";
    URLs["POST_INSERT_MODEL"] = "/admin/writemodel";
})(URLs || (URLs = {}));
