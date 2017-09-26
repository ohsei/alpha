export const getBrowserType = () => {
    const ua = navigator.userAgent
    console.log('ua: %s', ua)

    let agent = '';
    
        if(ua.match(/edge/i)){
            agent = 'edge'
        }
        else if(ua.match(/chrome/i)){
            agent = 'chrome'
        }
        else {
            agent = 'ie'
        }
    
        return agent;
  }
