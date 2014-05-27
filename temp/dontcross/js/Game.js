/**
 * Created by postepenno on 20.03.14.
 */

var Game = ComponentBox.extend({

    init: function()
    {
        this._super();

        this.createLevels();
    },

    loadProgress: function()
    {
        console.log("first");
        console.log(localStorage["game.version"]);
        console.log("second");
    },

    createLevels: function()
    {
        this.levels = [];

        //this.addLevel( {name:'EDITOR', items:[ {id:0, x:22, y:97}, {id:1, x:94, y:90}, {id:2, x:185, y:324}, {id:3, x:57, y:237}, {id:4, x:247, y:327}, {id:5, x:20, y:90}, {id:6, x:223, y:409}, {id:7, x:115, y:227}, {id:8, x:300, y:336}, {id:9, x:276, y:418}, {id:10, x:37, y:216}, {id:11, x:20, y:388}, {id:12, x:106, y:146}, {id:13, x:145, y:203}, {id:14, x:300, y:367}, {id:15, x:286, y:330} ], links:[ {p1:12, p2:7}, {p1:7, p2:1}, {p1:8, p2:1}, {p1:12, p2:8}, {p1:13, p2:15}, {p1:9, p2:15}, {p1:9, p2:14}, {p1:14, p2:11}, {p1:11, p2:6}, {p1:6, p2:3}, {p1:3, p2:0}, {p1:0, p2:4}, {p1:4, p2:2}, {p1:5, p2:2}, {p1:10, p2:5}, {p1:13, p2:10} ]} );

        this.addLevel( {name:'Krest', items:[ {id:0, x:126, y:225}, {id:1, x:126, y:533}, {id:2, x:488, y:533}, {id:3, x:488, y:224} ], links:[ {p1:3, p2:1}, {p1:0, p2:2} ]} );
        this.addLevel( {name:'Snowflake', items:[ {id:0, x:505, y:244}, {id:1, x:156, y:568}, {id:2, x:90, y:403}, {id:3, x:332, y:165}, {id:4, x:510, y:557}, {id:5, x:566, y:400}, {id:6, x:332, y:641}, {id:7, x:161, y:233} ], links:[ {p1:0, p2:1}, {p1:7, p2:4}, {p1:2, p2:5}, {p1:3, p2:6} ]} );
        this.addLevel( {name:'Snake', items:[ {id:0, x:285, y:402}, {id:1, x:285, y:619}, {id:2, x:286, y:173}, {id:3, x:489, y:620}, {id:4, x:489, y:400}, {id:5, x:131, y:506}, {id:6, x:477, y:159}, {id:7, x:132, y:286} ], links:[ {p1:0, p2:1}, {p1:2, p2:0}, {p1:6, p2:7}, {p1:7, p2:4}, {p1:5, p2:4}, {p1:5, p2:3} ]} );
        this.addLevel( {name:'Two quads', items:[ {id:0, x:140, y:209}, {id:1, x:475, y:616}, {id:2, x:475, y:416}, {id:3, x:134, y:616}, {id:4, x:475, y:207}, {id:5, x:141, y:416} ], links:[ {p1:3, p2:2}, {p1:5, p2:1}, {p1:4, p2:5}, {p1:0, p2:2}, {p1:5, p2:2}, {p1:0, p2:5}, {p1:5, p2:3}, {p1:3, p2:1}, {p1:2, p2:1}, {p1:4, p2:2}, {p1:4, p2:0} ]} );
        this.addLevel( {name:'Straight Circle', items:[ {id:0, x:497, y:226}, {id:1, x:133, y:577}, {id:2, x:68, y:407}, {id:3, x:324, y:154}, {id:4, x:504, y:582}, {id:5, x:574, y:404}, {id:6, x:323, y:660}, {id:7, x:140, y:230} ], links:[ {p1:3, p2:4}, {p1:2, p2:4}, {p1:0, p2:2}, {p1:0, p2:6}, {p1:7, p2:6}, {p1:7, p2:5}, {p1:1, p2:5}, {p1:3, p2:1} ]} );
        this.addLevel( {name:'Snowflake2', items:[ {id:0, x:324, y:407}, {id:1, x:497, y:226}, {id:2, x:133, y:577}, {id:3, x:68, y:407}, {id:4, x:324, y:154}, {id:5, x:504, y:582}, {id:6, x:574, y:404}, {id:7, x:323, y:660}, {id:8, x:140, y:230} ], links:[ {p1:2, p2:6}, {p1:8, p2:6}, {p1:8, p2:7}, {p1:1, p2:7}, {p1:1, p2:3}, {p1:3, p2:5}, {p1:4, p2:5}, {p1:4, p2:2}, {p1:0, p2:7}, {p1:4, p2:0}, {p1:0, p2:6}, {p1:0, p2:3} ]} );
        this.addLevel( {name:'Snowflake3', items:[ {id:0, x:497, y:226}, {id:1, x:133, y:577}, {id:2, x:68, y:407}, {id:3, x:324, y:154}, {id:4, x:504, y:582}, {id:5, x:574, y:404}, {id:6, x:323, y:660}, {id:7, x:140, y:230} ], links:[ {p1:0, p2:1}, {p1:2, p2:5}, {p1:7, p2:4}, {p1:3, p2:6}, {p1:3, p2:7}, {p1:7, p2:2}, {p1:2, p2:1}, {p1:1, p2:6}, {p1:6, p2:4}, {p1:5, p2:4}, {p1:0, p2:5} ]} );
        this.addLevel( {name:'Fixed Intro', items:[ {id:0, x:460, y:549, fixed: true}, {id:1, x:194, y:549, fixed: true}, {id:2, x:460, y:281, fixed: true}, {id:3, x:194, y:281, fixed: true}, {id:4, x:326, y:407, fixed: true}, {id:5, x:68, y:407}, {id:6, x:324, y:154}, {id:7, x:574, y:404}, {id:8, x:323, y:660} ], links:[ {p1:3, p2:1}, {p1:2, p2:3}, {p1:2, p2:0}, {p1:1, p2:0}, {p1:8, p2:4}, {p1:6, p2:4}, {p1:5, p2:4}, {p1:7, p2:4} ]} );
        this.addLevel( {name:'Quad in quad', items:[ {id:0, x:393, y:487}, {id:1, x:237, y:488}, {id:2, x:175, y:581, fixed: true}, {id:3, x:454, y:581, fixed: true}, {id:4, x:454, y:238, fixed: true}, {id:5, x:173, y:240, fixed: true}, {id:6, x:391, y:319}, {id:7, x:237, y:319}, {id:8, x:308, y:647, fixed: true}, {id:9, x:525, y:393, fixed: true}, {id:10, x:86, y:394, fixed: true}, {id:11, x:308, y:162, fixed: true} ], links:[ {p1:6, p2:9}, {p1:9, p2:0}, {p1:10, p2:1}, {p1:10, p2:7}, {p1:6, p2:11}, {p1:11, p2:7}, {p1:8, p2:0}, {p1:1, p2:8}, {p1:7, p2:1}, {p1:6, p2:7}, {p1:6, p2:0}, {p1:1, p2:0}, {p1:2, p2:3}, {p1:5, p2:2}, {p1:4, p2:5}, {p1:4, p2:3} ]} );
        this.addLevel( {name:'Periscope', items:[ {id:0, x:571, y:536, fixed: true}, {id:1, x:488, y:493, fixed: true}, {id:2, x:405, y:533, fixed: true}, {id:3, x:323, y:552, fixed: true}, {id:4, x:240, y:536, fixed: true}, {id:5, x:157, y:499, fixed: true}, {id:6, x:75, y:538, fixed: true}, {id:7, x:454, y:670, fixed: true}, {id:8, x:373, y:671, fixed: true}, {id:9, x:371, y:309}, {id:10, x:453, y:213}, {id:11, x:251, y:307}, {id:12, x:247, y:217}, {id:13, x:174, y:378}, {id:14, x:165, y:174}, {id:15, x:84, y:377}, {id:16, x:84, y:175}, {id:17, x:653, y:545, fixed: true}, {id:18, x:-20, y:549, fixed: true} ], links:[ {p1:12, p2:11}, {p1:6, p2:18}, {p1:6, p2:5}, {p1:4, p2:5}, {p1:4, p2:3}, {p1:3, p2:2}, {p1:1, p2:2}, {p1:1, p2:0}, {p1:17, p2:0}, {p1:7, p2:8}, {p1:10, p2:7}, {p1:10, p2:12}, {p1:14, p2:12}, {p1:14, p2:16}, {p1:16, p2:15}, {p1:15, p2:13}, {p1:13, p2:11}, {p1:9, p2:11}, {p1:9, p2:8} ]} );
        this.addLevel( {name:'Spikes', items:[ {id:0, x:557, y:162, fixed: true}, {id:1, x:-28, y:576, fixed: true}, {id:2, x:464, y:576, fixed: true}, {id:3, x:307, y:470, fixed: true}, {id:4, x:676, y:471, fixed: true}, {id:5, x:461, y:162}, {id:6, x:203, y:162}, {id:7, x:-30, y:349, fixed: true}, {id:8, x:289, y:162}, {id:9, x:375, y:162}, {id:10, x:307, y:243, fixed: true}, {id:11, x:674, y:243, fixed: true}, {id:12, x:463, y:349, fixed: true}, {id:13, x:80, y:649, fixed: true} ], links:[ {p1:12, p2:7}, {p1:6, p2:13}, {p1:6, p2:8}, {p1:9, p2:8}, {p1:9, p2:5}, {p1:0, p2:5}, {p1:4, p2:3}, {p1:2, p2:1}, {p1:11, p2:10} ]} );
        this.addLevel( {name:'X', items:[ {id:0, x:211, y:491, fixed: true}, {id:1, x:396, y:489}, {id:2, x:396, y:286, fixed: true}, {id:3, x:214, y:288}, {id:4, x:296, y:374}, {id:5, x:500, y:374, fixed: true}, {id:6, x:121, y:376, fixed: true}, {id:7, x:295, y:217, fixed: true}, {id:8, x:296, y:583, fixed: true} ], links:[ {p1:3, p2:0}, {p1:2, p2:3}, {p1:2, p2:1}, {p1:0, p2:1}, {p1:4, p2:8}, {p1:7, p2:4}, {p1:6, p2:4}, {p1:5, p2:4} ]} );
        this.addLevel( {name:'Line12Dots', items:[ {id:0, x:599, y:450}, {id:1, x:227, y:283}, {id:2, x:172, y:625}, {id:3, x:583, y:318}, {id:4, x:544, y:559}, {id:5, x:498, y:178}, {id:6, x:82, y:490}, {id:7, x:248, y:130}, {id:8, x:298, y:428}, {id:9, x:72, y:243}, {id:10, x:393, y:624}, {id:11, x:313, y:213} ], links:[ {p1:1, p2:0}, {p1:2, p2:1}, {p1:3, p2:2}, {p1:7, p2:3}, {p1:6, p2:7}, {p1:6, p2:5}, {p1:4, p2:5}, {p1:8, p2:4}, {p1:9, p2:8}, {p1:9, p2:10}, {p1:11, p2:10} ]} );
        this.addLevel( {name:'TwoLines', items:[ {id:0, x:318, y:285}, {id:1, x:109, y:570}, {id:2, x:221, y:130}, {id:3, x:378, y:510}, {id:4, x:276, y:476}, {id:5, x:602, y:142}, {id:6, x:214, y:457}, {id:7, x:517, y:142}, {id:8, x:588, y:320}, {id:9, x:464, y:464}, {id:10, x:66, y:232}, {id:11, x:191, y:365}, {id:12, x:562, y:255}, {id:13, x:146, y:674}, {id:14, x:554, y:559}, {id:15, x:433, y:170}, {id:16, x:461, y:537}, {id:17, x:276, y:597}, {id:18, x:133, y:171}, {id:19, x:330, y:213}, {id:20, x:493, y:658}, {id:21, x:55, y:429}, {id:22, x:568, y:425}, {id:23, x:345, y:144} ], links:[ {p1:0, p2:1}, {p1:1, p2:2}, {p1:2, p2:3}, {p1:7, p2:3}, {p1:7, p2:6}, {p1:6, p2:5}, {p1:5, p2:4}, {p1:8, p2:4}, {p1:9, p2:8}, {p1:10, p2:9}, {p1:11, p2:10}, {p1:12, p2:13}, {p1:14, p2:13}, {p1:14, p2:15}, {p1:19, p2:15}, {p1:19, p2:18}, {p1:17, p2:18}, {p1:17, p2:16}, {p1:20, p2:16}, {p1:21, p2:20}, {p1:21, p2:22}, {p1:23, p2:22} ]} );
        this.addLevel( {name:'FourQuads', items:[ {id:0, x:220, y:495}, {id:1, x:175, y:208}, {id:2, x:536, y:367}, {id:3, x:333, y:150}, {id:4, x:42, y:575}, {id:5, x:513, y:190}, {id:6, x:60, y:436}, {id:7, x:385, y:661}, {id:8, x:235, y:266}, {id:9, x:508, y:469}, {id:10, x:159, y:650}, {id:11, x:314, y:520}, {id:12, x:412, y:475}, {id:13, x:434, y:320}, {id:14, x:458, y:575}, {id:15, x:96, y:271} ], links:[ {p1:7, p2:3}, {p1:6, p2:2}, {p1:5, p2:1}, {p1:4, p2:0}, {p1:0, p2:1}, {p1:2, p2:3}, {p1:12, p2:8}, {p1:13, p2:9}, {p1:14, p2:10}, {p1:15, p2:11}, {p1:5, p2:4}, {p1:7, p2:6}, {p1:10, p2:11}, {p1:8, p2:9}, {p1:13, p2:12}, {p1:15, p2:14} ]} );
        this.addLevel( {name:'9Quads', items:[ {id:0, x:125, y:206}, {id:1, x:475, y:398}, {id:2, x:534, y:652}, {id:3, x:261, y:321}, {id:4, x:498, y:292}, {id:5, x:269, y:166}, {id:6, x:120, y:394}, {id:7, x:554, y:502}, {id:8, x:129, y:533}, {id:9, x:387, y:625}, {id:10, x:256, y:391}, {id:11, x:289, y:543}, {id:12, x:306, y:642}, {id:13, x:437, y:198}, {id:14, x:188, y:654}, {id:15, x:179, y:287} ], links:[ {p1:1, p2:2}, {p1:11, p2:7}, {p1:6, p2:5}, {p1:10, p2:6}, {p1:8, p2:4}, {p1:9, p2:5}, {p1:10, p2:9}, {p1:13, p2:14}, {p1:7, p2:3}, {p1:6, p2:2}, {p1:5, p2:1}, {p1:4, p2:0}, {p1:0, p2:1}, {p1:2, p2:3}, {p1:12, p2:8}, {p1:13, p2:9}, {p1:14, p2:10}, {p1:15, p2:11}, {p1:5, p2:4}, {p1:7, p2:6}, {p1:10, p2:11}, {p1:8, p2:9}, {p1:13, p2:12}, {p1:15, p2:14} ]} );
        this.addLevel( {name:'Quad quad', items:[ {id:0, x:354, y:639}, {id:1, x:556, y:639}, {id:2, x:554, y:453}, {id:3, x:360, y:447}, {id:4, x:77, y:639}, {id:5, x:259, y:639}, {id:6, x:268, y:450}, {id:7, x:81, y:453}, {id:8, x:357, y:368}, {id:9, x:554, y:369}, {id:10, x:559, y:182}, {id:11, x:355, y:182}, {id:12, x:81, y:371}, {id:13, x:268, y:371}, {id:14, x:264, y:184}, {id:15, x:78, y:180}, {id:16, x:173, y:556}, {id:17, x:457, y:556}, {id:18, x:457, y:272}, {id:19, x:180, y:272} ], links:[ {p1:8, p2:6}, {p1:13, p2:3}, {p1:19, p2:16}, {p1:16, p2:17}, {p1:18, p2:17}, {p1:18, p2:19}, {p1:3, p2:0}, {p1:0, p2:1}, {p1:2, p2:1}, {p1:2, p2:3}, {p1:7, p2:4}, {p1:4, p2:5}, {p1:6, p2:5}, {p1:6, p2:7}, {p1:10, p2:11}, {p1:10, p2:9}, {p1:8, p2:9}, {p1:11, p2:8}, {p1:12, p2:13}, {p1:14, p2:13}, {p1:14, p2:15}, {p1:15, p2:12} ]} );
        this.addLevel( {name:'Diagonal', items:[ {id:0, x:392, y:464, fixed:true}, {id:1, x:84, y:614}, {id:2, x:71, y:237}, {id:3, x:399, y:649}, {id:4, x:313, y:491}, {id:5, x:283, y:158}, {id:6, x:480, y:548, fixed:true}, {id:7, x:308, y:388, fixed:true}, {id:8, x:448, y:392}, {id:9, x:243, y:660}, {id:10, x:229, y:317, fixed:true}, {id:11, x:153, y:246, fixed:true}, {id:12, x:487, y:187}, {id:13, x:526, y:383}, {id:14, x:138, y:169}, {id:15, x:30, y:461}, {id:16, x:172, y:501} ], links:[ {p1:6, p2:2}, {p1:5, p2:6}, {p1:3, p2:0}, {p1:9, p2:0}, {p1:7, p2:4}, {p1:13, p2:7}, {p1:10, p2:8}, {p1:14, p2:10}, {p1:11, p2:12}, {p1:15, p2:11}, {p1:6, p2:1}, {p1:0, p2:6}, {p1:7, p2:0}, {p1:10, p2:7}, {p1:11, p2:10}, {p1:16, p2:11}, {p1:16, p2:12}, {p1:12, p2:8}, {p1:8, p2:4}, {p1:4, p2:3}, {p1:3, p2:2}, {p1:2, p2:1}, {p1:5, p2:1}, {p1:9, p2:5}, {p1:13, p2:9}, {p1:13, p2:14}, {p1:14, p2:15}, {p1:15, p2:16} ]} );
        this.addLevel( {name:'Minefield', items:[ {id:0, x:534, y:514}, {id:1, x:452, y:207}, {id:2, x:135, y:292}, {id:3, x:565, y:401, fixed:true}, {id:4, x:564, y:640, fixed:true}, {id:5, x:320, y:638, fixed:true}, {id:6, x:77, y:640, fixed:true}, {id:7, x:73, y:401, fixed:true}, {id:8, x:76, y:161, fixed:true}, {id:9, x:565, y:161, fixed:true}, {id:10, x:320, y:161, fixed:true}, {id:11, x:215, y:606}, {id:12, x:324, y:401, fixed:true} ], links:[ {p1:1, p2:2}, {p1:11, p2:2}, {p1:11, p2:0}, {p1:0, p2:1}, {p1:1, p2:7}, {p1:0, p2:7}, {p1:10, p2:0}, {p1:11, p2:10}, {p1:11, p2:3}, {p1:3, p2:2}, {p1:5, p2:2}, {p1:1, p2:5}, {p1:1, p2:6}, {p1:9, p2:11}, {p1:8, p2:0}, {p1:2, p2:4}, {p1:12, p2:2}, {p1:12, p2:1}, {p1:12, p2:0}, {p1:11, p2:12} ]} );
        this.addLevel( {name:'9HardQuads', items:[ {id:0, x:583, y:281}, {id:1, x:278, y:171}, {id:2, x:49, y:540}, {id:3, x:429, y:361}, {id:4, x:176, y:371}, {id:5, x:523, y:623}, {id:6, x:511, y:461}, {id:7, x:338, y:376}, {id:8, x:279, y:482}, {id:9, x:67, y:226}, {id:10, x:443, y:269}, {id:11, x:604, y:559}, {id:12, x:122, y:157}, {id:13, x:229, y:622}, {id:14, x:270, y:303}, {id:15, x:462, y:161} ], links:[ {p1:5, p2:0}, {p1:5, p2:2}, {p1:7, p2:2}, {p1:10, p2:7}, {p1:10, p2:5}, {p1:8, p2:5}, {p1:13, p2:8}, {p1:13, p2:10}, {p1:15, p2:10}, {p1:1, p2:2}, {p1:11, p2:7}, {p1:6, p2:5}, {p1:10, p2:6}, {p1:8, p2:4}, {p1:9, p2:5}, {p1:10, p2:9}, {p1:13, p2:14}, {p1:7, p2:3}, {p1:6, p2:2}, {p1:5, p2:1}, {p1:4, p2:0}, {p1:0, p2:1}, {p1:2, p2:3}, {p1:12, p2:8}, {p1:13, p2:9}, {p1:14, p2:10}, {p1:15, p2:11}, {p1:5, p2:4}, {p1:7, p2:6}, {p1:10, p2:11}, {p1:8, p2:9}, {p1:13, p2:12}, {p1:15, p2:14} ]} );
        this.addLevel( {name:'StaticQuad', items:[ {id:0, x:495, y:292}, {id:1, x:198, y:332}, {id:2, x:550, y:369}, {id:3, x:81, y:268}, {id:4, x:506, y:544}, {id:5, x:407, y:469, fixed:true}, {id:6, x:250, y:469, fixed:true}, {id:7, x:520, y:180}, {id:8, x:251, y:649}, {id:9, x:407, y:327, fixed:true}, {id:10, x:250, y:327, fixed:true}, {id:11, x:117, y:634}, {id:12, x:89, y:500}, {id:13, x:460, y:644}, {id:14, x:302, y:259}, {id:15, x:200, y:141} ], links:[ {p1:10, p2:7}, {p1:6, p2:3}, {p1:2, p2:5}, {p1:5, p2:0}, {p1:9, p2:4}, {p1:12, p2:9}, {p1:13, p2:10}, {p1:15, p2:10}, {p1:11, p2:10}, {p1:6, p2:7}, {p1:6, p2:2}, {p1:5, p2:1}, {p1:4, p2:5}, {p1:9, p2:8}, {p1:13, p2:9}, {p1:14, p2:10}, {p1:10, p2:6}, {p1:6, p2:5}, {p1:9, p2:5}, {p1:9, p2:10}, {p1:15, p2:11}, {p1:11, p2:7}, {p1:7, p2:3}, {p1:3, p2:2}, {p1:2, p2:1}, {p1:1, p2:0}, {p1:4, p2:0}, {p1:8, p2:4}, {p1:12, p2:8}, {p1:12, p2:13}, {p1:13, p2:14}, {p1:14, p2:15} ]} );
        this.addLevel( {name:'Matreshka', items:[ {id:0, x:539, y:433}, {id:1, x:442, y:203}, {id:2, x:93, y:395}, {id:3, x:91, y:238}, {id:4, x:545, y:534}, {id:5, x:205, y:134}, {id:6, x:77, y:647, fixed:true}, {id:7, x:547, y:130}, {id:8, x:409, y:669}, {id:9, x:380, y:136}, {id:10, x:562, y:177, fixed:true}, {id:11, x:167, y:442}, {id:12, x:437, y:339}, {id:13, x:601, y:303}, {id:14, x:350, y:464}, {id:15, x:314, y:670}, {id:16, x:260, y:512}, {id:17, x:463, y:532, fixed:true}, {id:18, x:162, y:624}, {id:19, x:586, y:635}, {id:20, x:73, y:523}, {id:21, x:180, y:289, fixed:true}, {id:22, x:258, y:441, fixed:true}, {id:23, x:228, y:215}, {id:24, x:346, y:358, fixed:true}, {id:25, x:345, y:216} ], links:[ {p1:25, p2:22}, {p1:22, p2:23}, {p1:24, p2:23}, {p1:24, p2:25}, {p1:21, p2:14}, {p1:14, p2:15}, {p1:15, p2:16}, {p1:16, p2:17}, {p1:18, p2:17}, {p1:19, p2:18}, {p1:19, p2:20}, {p1:20, p2:21}, {p1:5, p2:6}, {p1:4, p2:5}, {p1:3, p2:4}, {p1:13, p2:3}, {p1:12, p2:13}, {p1:11, p2:12}, {p1:10, p2:11}, {p1:10, p2:0}, {p1:0, p2:1}, {p1:1, p2:2}, {p1:2, p2:9}, {p1:8, p2:9}, {p1:7, p2:8}, {p1:6, p2:7} ]} );
        this.addLevel( {name:'SnakeFixed', items:[ {id:0, x:355, y:389, fixed:true}, {id:1, x:-34, y:525, fixed:true}, {id:2, x:352, y:579, fixed:true}, {id:3, x:265, y:593, fixed:true}, {id:4, x:170, y:650}, {id:5, x:388, y:516}, {id:6, x:191, y:463}, {id:7, x:367, y:657}, {id:8, x:574, y:540}, {id:9, x:252, y:405}, {id:10, x:437, y:402}, {id:11, x:273, y:135}, {id:12, x:477, y:224}, {id:13, x:517, y:661}, {id:14, x:142, y:374}, {id:15, x:240, y:197}, {id:16, x:174, y:423, fixed:true}, {id:17, x:541, y:135}, {id:18, x:104, y:309}, {id:19, x:202, y:536}, {id:20, x:50, y:392}, {id:21, x:195, y:340, fixed:true}, {id:22, x:571, y:377}, {id:23, x:172, y:259, fixed:true}, {id:24, x:666, y:305, fixed:true}, {id:25, x:470, y:523, fixed:true}, {id:26, x:470, y:741, fixed:true}, {id:27, x:584, y:166, fixed:true}, {id:28, x:121, y:183}, {id:29, x:302, y:348}, {id:30, x:48, y:645, fixed:true} ], links:[ {p1:18, p2:30}, {p1:18, p2:17}, {p1:29, p2:17}, {p1:29, p2:28}, {p1:22, p2:28}, {p1:15, p2:22}, {p1:14, p2:15}, {p1:13, p2:14}, {p1:12, p2:13}, {p1:11, p2:12}, {p1:11, p2:10}, {p1:10, p2:9}, {p1:9, p2:8}, {p1:7, p2:8}, {p1:6, p2:7}, {p1:5, p2:6}, {p1:4, p2:5}, {p1:4, p2:20}, {p1:19, p2:20}, {p1:27, p2:19}, {p1:0, p2:3}, {p1:25, p2:26}, {p1:3, p2:2}, {p1:3, p2:1}, {p1:21, p2:16}, {p1:23, p2:21}, {p1:24, p2:23} ]} );
        this.addLevel( {name:'Grid', items:[ {id:0, x:508, y:526, fixed: true}, {id:1, x:508, y:400}, {id:2, x:508, y:292, fixed: true}, {id:3, x:120, y:526}, {id:4, x:120, y:400, fixed: true}, {id:5, x:120, y:292}, {id:6, x:200, y:599}, {id:7, x:423, y:601}, {id:8, x:319, y:601, fixed: true}, {id:9, x:200, y:195, fixed: true}, {id:10, x:424, y:195}, {id:11, x:318, y:195} ], links:[ {p1:8, p2:6}, {p1:8, p2:7}, {p1:1, p2:0}, {p1:2, p2:1}, {p1:10, p2:11}, {p1:9, p2:11}, {p1:4, p2:3}, {p1:5, p2:4}, {p1:3, p2:0}, {p1:4, p2:1}, {p1:2, p2:5}, {p1:10, p2:7}, {p1:11, p2:8}, {p1:9, p2:6} ]} );
        this.addLevel( {name:'Fixed X', items:[ {id:0, x:315, y:493}, {id:1, x:172, y:672}, {id:2, x:585, y:410}, {id:3, x:584, y:545}, {id:4, x:503, y:486}, {id:5, x:566, y:165}, {id:6, x:36, y:441}, {id:7, x:110, y:249}, {id:8, x:559, y:295}, {id:9, x:215, y:167}, {id:10, x:41, y:314}, {id:11, x:240, y:566}, {id:12, x:569, y:632, fixed:true}, {id:13, x:69, y:630, fixed:true}, {id:14, x:68, y:163, fixed:true}, {id:15, x:573, y:158, fixed:true}, {id:16, x:320, y:148}, {id:17, x:398, y:638}, {id:18, x:395, y:246}, {id:19, x:157, y:323}, {id:20, x:321, y:399, fixed:true}, {id:21, x:195, y:515, fixed:true}, {id:22, x:447, y:516, fixed:true}, {id:23, x:448, y:279, fixed:true}, {id:24, x:195, y:282, fixed:true} ], links:[ {p1:20, p2:21}, {p1:21, p2:13}, {p1:11, p2:17}, {p1:16, p2:8}, {p1:5, p2:18}, {p1:19, p2:2}, {p1:15, p2:23}, {p1:23, p2:20}, {p1:20, p2:17}, {p1:20, p2:16}, {p1:20, p2:5}, {p1:2, p2:20}, {p1:24, p2:5}, {p1:5, p2:21}, {p1:21, p2:16}, {p1:16, p2:22}, {p1:17, p2:22}, {p1:23, p2:17}, {p1:23, p2:2}, {p1:2, p2:24}, {p1:22, p2:12}, {p1:20, p2:22}, {p1:24, p2:20}, {p1:14, p2:24}, {p1:1, p2:14}, {p1:1, p2:19}, {p1:0, p2:19}, {p1:15, p2:0}, {p1:15, p2:10}, {p1:10, p2:11}, {p1:11, p2:9}, {p1:9, p2:12}, {p1:6, p2:12}, {p1:8, p2:6}, {p1:8, p2:7}, {p1:13, p2:7}, {p1:3, p2:13}, {p1:18, p2:3}, {p1:4, p2:18}, {p1:14, p2:4} ]} );
        this.addLevel( {name:'GridFixed', items:[ {id:0, x:500, y:300}, {id:1, x:80, y:294}, {id:2, x:449, y:158}, {id:3, x:230, y:674}, {id:4, x:241, y:363}, {id:5, x:561, y:493}, {id:6, x:536, y:671, fixed:true}, {id:7, x:320, y:733, fixed:true}, {id:8, x:539, y:601}, {id:9, x:63, y:648, fixed:true}, {id:10, x:89, y:564}, {id:11, x:320, y:515, fixed:true}, {id:12, x:146, y:216}, {id:13, x:408, y:403}, {id:14, x:576, y:195}, {id:15, x:363, y:673}, {id:16, x:194, y:416, fixed:true}, {id:17, x:-24, y:416, fixed:true}, {id:18, x:665, y:333, fixed:true}, {id:19, x:431, y:333, fixed:true}, {id:20, x:595, y:292}, {id:21, x:62, y:468}, {id:22, x:128, y:483}, {id:23, x:591, y:403}, {id:24, x:281, y:275, fixed:true}, {id:25, x:353, y:140}, {id:26, x:543, y:156, fixed:true}, {id:27, x:366, y:483}, {id:28, x:281, y:75, fixed:true}, {id:29, x:60, y:157, fixed:true} ], links:[ {p1:18, p2:19}, {p1:3, p2:25}, {p1:3, p2:2}, {p1:20, p2:3}, {p1:29, p2:20}, {p1:29, p2:25}, {p1:25, p2:21}, {p1:21, p2:2}, {p1:2, p2:1}, {p1:26, p2:27}, {p1:26, p2:22}, {p1:23, p2:22}, {p1:27, p2:23}, {p1:23, p2:1}, {p1:22, p2:1}, {p1:27, p2:1}, {p1:1, p2:0}, {p1:8, p2:0}, {p1:12, p2:0}, {p1:13, p2:0}, {p1:13, p2:9}, {p1:9, p2:8}, {p1:12, p2:8}, {p1:12, p2:13}, {p1:28, p2:24}, {p1:16, p2:17}, {p1:11, p2:7}, {p1:14, p2:0}, {p1:0, p2:5}, {p1:10, p2:5}, {p1:15, p2:5}, {p1:5, p2:4}, {p1:4, p2:6}, {p1:10, p2:6}, {p1:14, p2:10}, {p1:14, p2:15}, {p1:0, p2:15} ]} );
        //this.addLevel( {name:'Krest', items:[ {id:0, x:126, y:225}, {id:1, x:126, y:533}, {id:2, x:488, y:533}, {id:3, x:488, y:224} ], links:[ {p1:3, p2:1}, {p1:0, p2:2} ]} );
        this.addLevel( {name:'Jail', items:[ {id:0, x:568, y:521}, {id:1, x:451, y:430}, {id:2, x:287, y:207}, {id:3, x:392, y:435, fixed:true}, {id:4, x:549, y:622, fixed:true}, {id:5, x:459, y:192}, {id:6, x:567, y:417}, {id:7, x:81, y:622, fixed:true}, {id:8, x:81, y:459}, {id:9, x:387, y:542, fixed:true}, {id:10, x:223, y:391, fixed:true}, {id:11, x:174, y:542, fixed:true}, {id:12, x:126, y:326}, {id:13, x:249, y:466}, {id:14, x:415, y:663}, {id:15, x:392, y:340, fixed:true}, {id:16, x:217, y:132}, {id:17, x:148, y:655}, {id:18, x:459, y:527}, {id:19, x:392, y:258, fixed:true}, {id:20, x:577, y:313}, {id:21, x:176, y:256, fixed:true}, {id:22, x:279, y:329}, {id:23, x:557, y:173, fixed:true}, {id:24, x:260, y:624}, {id:25, x:385, y:159}, {id:26, x:81, y:173, fixed:true} ], links:[ {p1:13, p2:14}, {p1:13, p2:8}, {p1:8, p2:4}, {p1:8, p2:5}, {p1:14, p2:8}, {p1:18, p2:13}, {p1:23, p2:18}, {p1:24, p2:18}, {p1:18, p2:14}, {p1:2, p2:14}, {p1:10, p2:1}, {p1:10, p2:20}, {p1:10, p2:2}, {p1:16, p2:10}, {p1:10, p2:0}, {p1:1, p2:0}, {p1:2, p2:1}, {p1:20, p2:2}, {p1:16, p2:20}, {p1:21, p2:11}, {p1:11, p2:9}, {p1:3, p2:9}, {p1:19, p2:15}, {p1:19, p2:21}, {p1:25, p2:22}, {p1:12, p2:6}, {p1:26, p2:22}, {p1:22, p2:17}, {p1:17, p2:12}, {p1:12, p2:7}, {p1:7, p2:6}, {p1:6, p2:5}, {p1:5, p2:4}, {p1:13, p2:4}, {p1:23, p2:13}, {p1:23, p2:24}, {p1:24, p2:25}, {p1:25, p2:26} ]} );

        this.curLevel = undefined;
    },

    addLevel: function(data)
    {
        var id = this.levels.length;
        var level = new Level(id, data);
        this.levels.push(level);
    },

    levelStart: function(level)
    {
        this.curLevel = level;

        this.isLevelCompleted = false;
        this.isLevelFailed = false;

        createjs.Ticker.init();
        this.startTime = createjs.Ticker.getTime(true);
        this.levelTime = 0;

        this.levelView = new LevelView(this);
        Main.addView(this.levelView);

        this.logic = new GameLogic(this);
        this.addComponent(this.logic);

        this.tickRef = createjs.Ticker.on("tick", this.tick, this);
    },

    tick: function()
    {
        this.levelTime = Math.floor(createjs.Ticker.getTime(true) - this.startTime);
        this.levelView.update();
    },

    levelStartByID: function(id)
    {
        var level = this.levels[id];
        this.levelStart(level);
    },

    levelAbort: function()
    {
        if (this.hasComponent(this.logic)) this.removeComponent(this.logic);
        Main.removeViewByClass(LevelView);
        Main.removeViewByClass(LevelCompleteView);
        Main.removeViewByClass(LevelFailView);
        Main.removeViewByClass(PauseView);
        Main.removeViewByClass(GameCompleteView);

        createjs.Ticker.off("tick", this.tickRef);
    },

    levelNext:function()
    {
        var levelId = this.curLevel.id;
        this.levelAbort();

        if (levelId == this.levels.length - 1)
        {
            this.gameComplete();
        }
        else
        {
            this.levelStartByID(levelId + 1);
        }

    },

    levelComplete: function()
    {
        this.logic.removeTouchListener();

        this.isLevelCompleted = true;
        this.curLevel.complete(this.levelTime);
        cookies.levelComplete();
        this.levelView.levelComplete();
        Main.addView( new LevelCompleteView(this) );
        Sounds.play("sndLevelComplete");
        createjs.Ticker.off("tick", this.tickRef);
    },

    tickerPause: function()
    {
        createjs.Ticker.setPaused(true);
    },

    tickerResume: function()
    {
        createjs.Ticker.setPaused(false);
    },

    levelFail: function()
    {
        this.isLevelFailed = true;
        Main.addView( new LevelFailView(this) );
        Sounds.play("sndLevelFail");
    },

    gameComplete: function()
    {
        Main.addView( new GameCompleteView(this) );
    },

    gameAbort:function()
    {
        this.levelAbort();
        Main.addView( new LevelSelectView(this) );
    }

});