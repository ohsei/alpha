export const getBrowserType = () => {
    const ua = navigator.userAgent
    let agent = "";
    
        if(ua.match(/msie/i)){
            if(ua.match(/msie 9/i))
                agent = "IE9";
            else if(ua.match(/msie 8/i))
                agent = "IE8";
            else if(ua.match(/msie 7/i))
                agent = "IE7";
        }
        else if(ua.match(/ipad/i))
            agent = "iPad";
        else if(ua.match(/iphone/i))
            agent = "iPhone";
        else if(ua.match(/ipod/i))
            agent = "iPod";
        else if(ua.match(/android/i)){
            if(ua.match(/mobile/i))
                agent = "Android";
            else
                agent = "AndroidTab";
        }
        else if(ua.match(/firefox/i))
            agent = "firefox";
        else if(ua.match(/opera/i))
            agent = "opera";
        else if(ua.match(/netscape/i))
            agent = "netscape";
        else if(ua.match(/safari/i)){
            if(ua.match(/chrome/i))
                agent = "chrome";
            else
                agent = "safari";
        }
        else
            agent = "unrecognized";
    
        return agent;
  }
