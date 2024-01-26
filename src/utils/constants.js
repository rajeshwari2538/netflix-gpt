export const LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR = "https://occ-0-3647-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229";

export const BG_IMAGE = "https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const API_OPTIONS= {
    method: 'GET',
    hostname: 'api.themoviedb.org',
    port: null,
    path: '/3/movie/now_playing?language=en-US&page=1',
    headers: {
      accept: 'application/json',
      Authorization: "Bearer " + process.env.REACT_APP_TMDN_KEY,
    }
  };

  export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"

  export const SUPPORTED_LANGUAGES = [
    {identifier:"en", name: "English"},
    {identifier:"hi", name: "Hindi"},
    {identifier:"kn", name: "Kannada"},
    {identifier:"es", name: "Spanish"},
    {identifier:"ja", name: "Japanese"}
  ]
