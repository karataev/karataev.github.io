/**
 * FGL SDK - Implement this into your game!
 *
 * Version 1.1, 21st January 2014
 * 
 * NOTE: This is a placeholder SDK, it will tell provide basic example functionality
 * to show that you have implemented our SDK correctly, but it can NOT be used for
 * publishing.
 *
 * For more information see the Implementation Guide or API documentation
 */
window.fgl = new FGLImplementationSDK();

function FGLImplementationSDK(){
    var self = this;

    self.SIZE_300x250 =  01;
    self.SIZE_OVERLAY =  02;
    
    self.overlay = null;
    self.overlayClose = null;
    self.ready = false;
    self.readyFunctions = [];
    
    self.crossPromotionEnabled = true;
    self.unlockEnabled         = true;
    self.brandingEnabled       = true;
    
    self.container = null;
    self.gameId    = 'test';
    
    self.getMeta = function(meta) { 
        var metas = document.getElementsByTagName('meta'); 
        
        for (i=0; i<metas.length; i++) { 
            if (metas[i].getAttribute("name") == meta) { 
                return metas[i].getAttribute("content"); 
            }
        }
        return "";
    };
    
    self.loadScores = function(){
        var scoresStr = localStorage["lb." + self.gameId];
        if(scoresStr == null || scoresStr == "") return [];
        return JSON.parse(scoresStr);
    }
    
    self.saveScores = function(scores){
        while(scores.length > 20) scores.pop();
        localStorage["lb." + self.gameId] = JSON.stringify(scores);
    }
    
    /**
     * Initialises the API. Pass in the element which contains your game, and your game ID
     * obtained from FGL.com
     */
    self.create = function(gameElement) {
        gameId = self.getMeta("fgl-gameid");
        if(!gameId) gameId = 'test';
        
        if(!(gameElement instanceof Element)){
            try { // Is it jQuery selected?
                gameElement = gameElement[0];
            } catch(exception){}
            
            if(!(gameElement instanceof Element)){
                alert("Error: The gameElement that you passed to the FGL SDK is invalid");
                throw "Error: The gameElement that you passed to the FGL SDK is invalid";
            }
        }
        
        self.gameId = gameId;
        self.container = gameElement;
        
        var div = self.createTestBootScreen();
        document.body.appendChild(div);
    };
    
    self.createTestBootScreen = function(){
        
        var holder = document.createElement('span');
        
        var divHTML = 
            "<div style='position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(0,0,0,0.9); font-family: Arial; border: 2px solid #000; padding: 10px; color: #FFFFFF;'>" +
            "<h1>FGL SDK <small>Game testing framework</small></h1>" +
            "<div style='width: 500px;'>" +
            "<p>The FGL SDK Game Testing framework allows you to test your app before submitting it to the FGL Mobile Platform.</p>" +
            "<p>Your game should not have started playing or initializing yet, it should begin playing when you click the Start Game button below.</p>" +
            "<fieldset><legend>Test Session Options:</legend>" +
            "<label><input type='checkbox' id='fgl_hideMoreGames'> Disable cross promotion</label><br />" +
            "<label><input type='checkbox' id='fgl_hideUnlocks'> Disable in app upgrade</label><br />" +
            "<label><input type='checkbox' id='fgl_unlockGame'> Game is premium mode</label><br />" +
            "<label><input type='checkbox' id='fgl_sponsored'> Show sponsor branding</label>" +
            "</fieldset>" +
            "<h3><span style='color: #AAA;'>Game title:</span> " + document.title + "</h3>" +
            "<p><button onclick='fgl_testBoot();' style='font-size: 30px'>Start Game</button></p>" +
            "</div></div>";
        
        holder.innerHTML = divHTML;
        window.fgl_testBoot = function(){
            
            self.crossPromotionEnabled = !document.getElementById('fgl_hideMoreGames').checked;
            self.unlockEnabled = !document.getElementById('fgl_hideUnlocks').checked;
            self.inApp.unlocked = document.getElementById('fgl_unlockGame').checked;
            self.brandingEnabled = document.getElementById('fgl_sponsored').checked;
            
            
            document.body.removeChild(holder);
            self.boot();
        };
        
        return holder;
    };
    
    self.boot = function() {
        self.ads = new self.AdManager();
    }
    
    /**
     * Not currently implemented
     */
    self.reportGameState = function(state) {
        // Placeholder
    };
    
    /**
     * Not currently implemented
     */
    self.requestQuit = function() {
        // Placeholder
    };
    
    /**
     * @private
     */
    self.doReadyEvents = function(){
        for(var i in self.readyFunctions){
            self.readyFunctions[i]();
        }
        self.ready = true;
    };
    
    /**
     * @private
     */
    self.AdManager = function(){
        var ad_self = this;
        ad_self.loadTimeout = 0;
        ad_self.pool = [];
        
        ad_self.register = function(ads){
            for(var i in ads){
                ad_self.pool.push(ads[i]);
            }
            ad_self.loaded();
        };
        
        ad_self.next = function(){
            if (ad_self.pool.length == 0) return null;
            var ad = ad_self.pool.shift();
            ad_self.pool.push(ad);
            return ad;
        };
        
        ad_self.loaded = function(){
            clearTimeout(ad_self.loadTimeout);
            self.doReadyEvents();
        };
        
        ad_self.initScript = function(){
            var load = document.createElement('script');
            load.src = 'https://reports.fgl.com/sandbox/ads/html5/';
            document.body.appendChild(load);
            ad_self.loadTimeout = setTimeout(ad_self.loaded, 1500);
            return load;
        }();
    };
    
    /**
     * Pass your game's initialiser functions to this
     */
    self.onReady = function(f){
        if(self.ready) f();
        else self.readyFunctions.push(f);
    }
    
    /**
     * Displays an advert
     */
    self.show3rdPartyAd = self.showAd = function(options) {
        if(self.inApp && self.inApp.isUnlocked()) return;
    
        var ad = self.ads.next();
        if(ad == null) return;
        
        var adImage = document.createElement('img');
        adImage.src = ad.image;
        adImage.style.width = ad.image_width + "px";
        adImage.style.height = ad.image_height + "px";
        
        var adLink = document.createElement('a');
        adLink.target = '_blank';
        adLink.href = ad.link;
        adLink.appendChild(adImage);
        adLink.onclick = adLink.ontouchend = function(){
            var adWindow = window.open(ad.link, '_blank');
            adWindow.focus();
            return false;
        };
        
        var overlay = self.addOverlay('div', true);
        overlay.style.textAlign  = 'center';
        overlay.style.paddingTop = (self.container.offsetHeight - ad.image_height) / 2 + "px";
        overlay.appendChild(adLink);
        self.overlay.onclick = self.overlay.ontouchend = function(){ return false; };
    };
    
    /**
     * Submits the given score to the specified leaderboard. If your game
     * only has one leaderboard, do not supply a leaderboardID.
     */
    self.submitScore = function(score, leaderboardID, extra) {
        leaderboardID = leaderboardID || 'default';
        
        var scores = self.loadScores();
        var time = new Date().getTime();
        
        var playerName = prompt("Enter your name:");
        if(!playerName) return;
        
        scores.push({
            score: score,
            player: playerName,
            time: time
        });
        
        scores.sort(function(a,b){
            if(a.score == b.score) return 0;
            return a.score < b.score ? 1 : -1;
        });
        
        self.saveScores(scores);
        
        self.displayScoreboard(leaderboardID, time);
    }
    
    /** 
     * Displays the scoreboard UI over your game
     */
    self.displayScoreboard = function(leaderboardID, highlightScore) {
        leaderboardID = leaderboardID || 'default';
        highlightScore = highlightScore || 0;
        
        var overlay = self.addOverlay();
        overlay.style.textAlign = 'center';
        overlay.style.lineHeight = self.container.offsetHeight + "px";
        overlay.style.color = "#FFFFFF";
        overlay.style.fontFamily = 'sans-serif, arial';
        overlay.style.fontSize   = '22px';
        var html = "<div style='padding-top: 30px; line-height: 16px; font-size: 16px; text-align: center; font-weight: normal;'><h2>Leaderboard</h2><table style='background-color: #FFFFFF; color: #000000; width: 400px; border-radius: 5px; margin: auto;'><tr><th>#</th><th>Name</th><th>Score</th><th>Date</th></tr>";
        
        var scores = self.loadScores();
        var num = 1;
        for(var i in scores){
            var score = scores[i];
            if(score.time == highlightScore){
                html += "<tr style='background-color: #FFFF55 !important; font-weight: bold; border-bottom: 1px solid #DDDDDD;'>";
            } else {
                html += "<tr style='border-bottom: 1px solid #DDDDDD;'>";
            }
            
            html += "<td>" + (num++) +"</td><td>" + score.player + "</td><td>" + score.score + "</td><td>" + new Date(score.time).toLocaleDateString() + "</td></tr>";
        }
        
        html += "</table></div>";
        
        overlay.innerHTML = html;
    }
    
    /** 
     * Removes the scoreboard UI from your game
     */
    self.hideScoreboard = function() {
        self.removeOverlay();
    }
    
    /** 
     * Grants the specified achievement to the player
     */
    self.grantAchievement = function(achievementId) {
        // Placeholder
    }
    
    /** 
     * Shows a list of achievements with their locked/unlocked states
     */
    self.showAchievements = function() {
        // Placeholder
    }
    
    /** 
     * Returns true if the player has unlocked the specified achievement
     */
    self.hasAchievement = function(achievementId) {
        return false;
    }
    
    /**
     * Returns true if the app is running in premium (unlocked) mode:
     */
    self.isPremium = function(){
        return self.inApp && self.inApp.isUnlocked();
    };
    
    /** 
     * Gives access to the In app purchasing functions.
     */
    self.inApp = new function(){
        var inApp_self = this;
        var unlocked = false;
        
        /**
         * Returns true if the app has been unlocked by a payment.
         */
        inApp_self.isUnlocked = function(item) {
            item = item || 'unlock';
            return inApp_self.unlocked || false;
        }
        
        /**
         * Begins the process of unlocking a game.
         */
        inApp_self.initiateUnlockFunction = function(successFunction, failFunction) {
            if(self.unlockEnabled == false) return;
            
            if(inApp_self.isUnlocked()){
                successFunction();
                return;
            }
            
            self.addOverlay();
            setTimeout(function(){
                var r = confirm("EXAMPLE: In app purchase. Press 'OK' to simulate a succesful in app purchase, 'Cancel' otherwise.\n\nOK: Succesful Purchase\nCancel: Failed purchase");
                self.removeOverlay();
                
                if(r){
                    inApp_self.unlocked = true;
                    successFunction();
                }else{
                    inApp_self.unlocked = false;
                    failFunction();
                }
            }, 10);
        }
    };
    
    /**
     * Displays the "More Games" page
     */
    self.showMoreGames = function() {
        var mgImage = document.createElement('img');
        mgImage.src = 'https://reports.fgl.com/sandbox/ads/html5/cross_promo_cover.png';
        mgImage.style.width = "400px";
        mgImage.style.height = "350px";
        
        var overlay = self.addOverlay('div', true);
        overlay.style.textAlign  = 'center';
        overlay.style.paddingTop = (self.container.offsetHeight - 350) / 2 + "px";
        overlay.appendChild(mgImage);
    };
    
    /**
     * Returns the URI (or data URI) of the branding logo
     */
    self.getBrandingLogo = function() {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAABkAgMAAADS7sWdAAAADFBMVEX/AAD/////r6//T0/SY5eQAAAC2UlEQVR4Xu3Wv2sUTRwG8E1CwCvurrrUFp7iH/CFRCIarCwCgewzs+YGs1xIYQiazWEZSC5YrMm9VeYaGxsLjxSnVulC4MADfzTO+QfIChGLNCmEwLpze4WXZufe7cLO8sC3+bDzi5mx0rYS0rT7V8dnPvOZzzxrteQQYJCjeG5ZhSFvKxrJ/2q9lmm8Ai+l86BhL0f158MeI/ujZ2jfxdHZDPjEgQp0UZl4JU097RV58Uzu3TuBG15TFBfTpp6X9pUTfdtSoIFtRYNCGq5fW9YhwEt12HISrqJBYeYtaxwNLEa+Ad4rQyiKiwXT/x8qH48i74N/L8FRFBfCdPwsAlg67HsFO/YKjqmHHwGr+P/9vA9xylP5aorx46GPrdj3yrE3n3/tO9rb2ivCQt+rSWyMMv8eRN93sRH7Oj6Nsv6u3L2tWa35Mfbu7LQ0Pr98OFYur5mwbsSehY40Pj9XgZZ8sgom0WKQupBI8AkhCKTxHayk8v+hnsq7s7lUnoXyit+/ma+EYcDlP+D5AAQ6yV6EF/mh69YfANJJ9stALaUXB+m8/S2d55FvAewtsPQG/poEWtquSR0jv24RXEvheBwvj/NwrDKIWzkddiuf3P8HzTy+VCb5jCv3yx9Qa34GieB9lDq7fprgnQPVxRwnNITipV0I2cAmaBOCahBsHAl+xVYEz1bwFgHaga0IAjQPW6eXS9g/Yd5WATxH4mkV6MQPD0eSD64zRUk+sBUwJwB4gB9fvLaiDpjOzXJS/2GrysWYLmph2NVegSs6B+hrGBr57fDdwP+57H+a+Bw87bcADPkozMBHA/YE8NgDVi+NH00Tr/rzX60CL/zh+WdTZn7HLsXrHz88FkBzcPrrb+B7ZTbGCF1H8bL2/f23AjeKMOm/Kh7+kLu/iRfaUns3zIHEnRMdluy53Cgsq/UJiXYBR5HnlkLAjinKDAuuxvmf+cxnPvOZT9n+AopvVS+ZbINEAAAAAElFTkSuQmCC";
    };
    
    /**
     * Call this method when the user clicks or taps on the branding logo
     */
    self.handleBrandingClick = function() {
        alert("FGL SDK: Branding was succesfully clicked");
    }
    
    /**
     * @private
     */
    self.removeOverlay = function() {
        try{ self.overlay.parentNode.removeChild(self.overlay); }catch(e){}
        try{ self.overlayClose.parentNode.removeChild(self.overlayClose); }catch(e){}
        self.overlay = null;
        self.overlayClose = null;
    }
    
    /**
     * @private
     */
    self.addOverlay = function(type, skipRemove) {
        if(self.overlay != null){
            self.removeOverlay();
        }
    
        type = type || 'div';
    
        self.overlay = document.createElement(type);
        self.overlay.style.position = "fixed";
        self.overlay.style.top = self.container.offsetTop + 'px';
        self.overlay.style.left = self.container.offsetLeft + 'px';
        self.overlay.style.width = self.container.offsetWidth + "px";
        self.overlay.style.height = self.container.offsetHeight + "px";
        self.overlay.style.border = "0 none";
        self.overlay.style.backgroundColor = "rgba(0,0,0,0.8)";
        if(skipRemove !== true){
            self.overlay.onclick = self.overlay.ontouchend = function(){
                self.removeOverlay();
                return true;
            };
        }
        
        var close = document.createElement("a");
        
        close.style.position = 'absolute';
        close.style.zIndex = 5;
        close.style.top = (self.container.offsetTop + 10) + 'px';
        close.style.left = (self.container.offsetLeft + self.container.offsetWidth-70) + 'px';
        close.style.width = '50px';
        close.style.height = '50px';
        close.style.backgroundColor = 'rgba(255,255,255,0.8)';
        close.style.color = '#333333';
        close.style.fontSize = '40px';
        close.style.textDecoration = 'none';
        close.style.fontWeight = 'bold';
        close.style.textAlign = 'center';
        close.style.lineHeight = '50px';
        close.style.borderRadius = '10px';
        close.innerHTML = '&times;';
        close.href = '#';
        close.onclick = self.overlay.ontouchend = function(){
			self.removeOverlay();
            return true;
        };
        
        self.overlayClose = close;
        
        self.container.parentNode.appendChild(self.overlay);
        self.container.parentNode.appendChild(self.overlayClose);
        
        return self.overlay;
    }
};