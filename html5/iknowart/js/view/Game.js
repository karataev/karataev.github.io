/**
 * Created by postepenno on 31.01.14.
 */

var Game = ComponentBox.extend({

    init: function() {
        this._super();

        this.curLevel = undefined;
        this.playerAnswer = undefined;

        this.createLevels();

        this.addComponent( new Background() );
        this.ui = new GameUI(Main.topContainer, this);
        this.addComponent(this.ui);

        if (Config.START_LAST_LEVEL) this.levelStart(this.levels.length - 1);
        else this.levelStart(0);
    },

    createLevels: function()
    {
        this.levels = [];
        this.addLevel("italianPolden", 18, -228, 1.39, {
            ru:{answers:["ВИНОГРАД", "ЛАМПОЧКА", "КРЫСА", "МОРКОВКА"], title:"Карл Брюллов. Итальянский полдень, 1827"},
            en:{answers:["GRAPES", "LIGHTBULB", "RAT", "CARROT"], title:"Karl Bryullov. Italian Midday, 1827"}
            });

        this.addLevel("alenushka", -26, 78, 2.06, {
            ru:{answers:["ДЕВОЧКА", "МЕДВЕДЬ", "РЫБАК", "ПИАНИНО"], title:"Виктор Васнецов. Аленушка, 1881"},
            en:{answers:["GIRL", "BEAR", "FISHERMAN", "PIANO"], title:"Viktor Vasnetsov. Alionushka, 1881"}
        });

        this.addLevel("skelet", 90, 46, 1.38, {
            ru:{answers:["СИГАРЕТА", "ТРУБКА", "УСЫ", "СВИСТОК"], title:"Винсент ван Гог. Скелет с сигаретой, 1886"},
            en:{answers:["CIGARETTE", "PIPE", "MOUSTACHES", "WHISTLE"], title:"Vincent van Gogh. Skull of a Skeleton with Burning Cigarette, 1886"}
        });
        this.addLevel("sunday", -165, 180, 1, {
            ru:{answers:["СОБАКА", "МАРТЫШКА", "КОШКА", "ЗМЕЯ"], title:"Жорж-Пьер Сера. Воскресный день на острове Гранд-Жатт, 1884—1886"},
            en:{answers:["DOG",  "MONKEY", "CAT", "SNAKE"], title:"Georges Seurat. A Sunday Afternoon on the Island of La Grande Jatte, 1884—1886"}
        });

        this.addLevel("redtower", -164, -40, 2, {
            ru:{answers:["КРАСНАЯ БАШНЯ", "ТОРГОВЫЙ ЦЕНТР", "ГОДЗИЛЛА", "ЖИРАФЫ"], title:"Джорджо де Кирико. Красная башня, 1913"},
            en:{answers:["RED TOWER", "SHOPPING MALL", "GODZILLA", "GIRAFFES"], title:"Giorgio de Chirico. The Red Tower, 1913"}
        });

        this.addLevel("dog", -85, 200, 1.17, {
            ru:{answers:["СОБАКА", "ПЕРИСКОП", "КРОТ", "КАКАШКА"], title:"Франциско Гойя. Собака, 1819—1823"},
            en:{answers:["DOG", "PERISCOPE", "MOLE", "POOP"], title:"Francisco Goya. The Dog, 1819—1823"}
        });

        this.addLevel("9val", -85, 247, 1.09, {
            ru:{answers:["ЛЮДИ", "ДЕЛЬФИН", "ПИНГВИН", "РУСАЛКА"], title:"Иван Айвазовский. Девятый вал, 1850"},
            en:{answers:["PEOPLE", "DOLPHIN", "PENGUIN", "MERMAID"], title:"Ivan Aivazovsky. The Ninth Wave, 1850"}
        });

        this.addLevel("arnolfini", 9, 239, 1, {
            ru:{answers:["ТАПОЧКИ", "СОБАКА", "ТАРАКАН", "ГАНТЕЛИ"], title:"Ян ван Эйк. Портрет четы Арнольфини, 1434"},
            en:{answers:["SLIPPERS", "DOG", "COCKROACH", "DUMBBELLS"], title:"Jan van Eyck. The Arnolfini Portrait, 1434"}
        });

        this.addLevel("hunters", 197, -179, 1, {
            ru:{answers:["ПТИЦА", "ДРАКОН", "ЗВЕЗДА СМЕРТИ", "ЗАМОК"], title:"Питер Брейгель Старший. Охотники на снегу, 1565"},
            en:{answers:["BIRD", "DRAGON", "DEATH STAR", "CASTLE"], title:"Pieter Bruegel the Elder. The Hunters in the Snow, 1565"}
        });

        this.addLevel("vangog", 0, -54, 1.17, {
            ru:{answers:["ВАН ГОГ", "МАЛЕВИЧ", "РАФАЭЛЬ", "ДА ВИНЧИ"], title:"Винсент ван Гог. Автопортрет с перевязанным ухом и трубкой, 1889"},
            en:{answers:["VAN GOGH", "MALEVICH", "RAPHAEL", "DA VINCI"], title:"Vincent van Gogh. Self portrait with bandaged ear, 1889"}
        });

        this.addLevel("garden", -1, -136, 1, {
            ru:{answers:["ЗАЯЦ", "ВЛАДИМИР ПУТИН", "ДЯТЕЛ", "КИТ"], title:"Иероним Босх. Сад земных наслаждений, 1500-1510"},
            en:{answers:["RABBIT", "VLADIMIR PUTIN", "WOODPECKER", "WHALE"], title:"Hieronymus Bosch. The Garden of Earthly Delights, 1500-1510"}
        });

        this.addLevel("mart", -48, 117, 1.06, {
            ru:{answers:["ЛОШАДЬ", "МЕРСЕДЕС", "ТИГР", "КОРОВА"], title:"Исаак Левитан. Март, 1895"},
            en:{answers:["HORSE", "MERCEDES", "TIGER", "COW"], title:"Isaac Levitan. March, 1895"}
        });

        this.addLevel("grachi", -253, 247, 0.59, {
            ru:{answers:["ПТИЦА", "САПОГ", "КОЛОДЕЦ", "ТАНК"], title:"Алексей Саврасов. Грачи прилетели, 1871"},
            en:{answers:["BIRD", "BOOT", "WELL", "TANK"], title:"Alexei Savrasov. The Rooks Have Come Back, 1871"}
        });

        this.addLevel("girlWithPeaches", -140, -260, 1, {
            ru:{answers:["ТАРЕЛКА", "ЧАСЫ", "КАРТИНА", "ГОЛОВА ОЛЕНЯ"], title:"Валентин Серов. Девочка с персиками, 1887"},
            en:{answers:["PLATE", "CLOCK", "PAINTING", "DEER'S HEAD"], title:"Valentin Serov. The girl with peaches, 1887"}
        });

        this.addLevel("sunrise", 152, -137, 0.62, {
            ru:{answers:["СОЛНЦЕ", "НЛО", "МЕТЕОРИТ", "ДИРИЖАБЛЬ"], title:"Клод Моне. Впечатление. Восходящее солнце, 1872"},
            en:{answers:["SUN", "UFO", "METEORITE", "AIRSHIP"], title:"Claude Monet. Impression, Sunrise, 1872"}
        });

        this.addLevel("madonna", -95, -141, 1.64, {
            ru:{answers:["МЛАДЕНЕЦ", "КУВШИН", "КНИГА", "КОШКА"], title:"Рафаэль. Сикстинская Мадонна, 1512—1513"},
            en:{answers:["CHILD", "JUG", "BOOK", "CAT"], title:"Raphael. Sistine Madonna, 1512—1513"}
        });

        this.addLevel("gornostai", 40, 140, 1.64, {
            ru:{answers:["ГОРНОСТАЙ", "ТАКСА", "КРЫСА", "ДИНОЗАВР"], title:"Леонардо да Винчи. Дама с горностаем, 1489–1490"},
            en:{answers:["ERMINE", "DACHSHUND", "RAT", "DINOSAUR"], title:"Leonardo da Vinci. Lady with an Ermine, 1489–1490"}
        });

        this.addLevel("players", 0, 29, 1.17, {
            ru:{answers:["КАРТЫ", "КОЛБАСА", "АЙФОНЫ", "ПЕЛЬМЕНИ"], title:"Поль Сезанн. Игроки в карты, 1894-1895"},
            en:{answers:["CARDS", "SAUSAGE", "IPHONES", "PELMENI"], title:"Paul Cezanne. The Card Players, 1894-1895"}
        });

        this.addLevel("serezhka", 48, 9, 1.03, {
            ru:{answers:["СЕРЕЖКА", "ТАТУИРОВКА", "ШРАМ", "НАУШНИКИ"], title:"Ян Вермеер. Девушка с жемчужной сережкой, ок. 1665"},
            en:{answers:["EAR-RING", "TATTOO", "SCAR", "HEADPHONES"], title:"Johannes Vermeer. Girl with a Pearl Earring, 1665"}
        });

        this.addLevel("suprem", 40, -44, 2.6, {
            ru:{answers:["СИНИЙ КВАДРАТ", "РОЗОВЫЙ КРУГ", "ЖЕЛТЫЙ ЦИЛИНДР", "ЧЕРНАЯ ДЫРА"], title:"Казимир Малевич. Супрематическая композиция, 1916"},
            en:{answers:["BLUE SQUARE", "PINK CIRCLE", "YELLOW CYLINDER", "BLACK HOLE"], title:"Kazimir Malevich. Suprematist Composition, 1916"}
        });
    },

    addLevel: function(asset, stickerX, stickerY, stickerScale, data)
    {
        var id = this.levels.length;
        this.levels.push( new Level(id, asset, stickerX, stickerY, stickerScale, data) );
    },

    levelStart: function(id)
    {
        this.curLevel = this.levels[id];

        var x = [15, 325, 15, 325];
        var y = [820, 820, 890, 890];
        this.abuttons = [];

        var shuffledAnswers = this.curLevel.getAnswers().slice(0);
        shuffledAnswers = Util.shuffle(shuffledAnswers);

        this.painting = new Painting(Main.viewContainer, this.curLevel);
        this.addComponent(this.painting);

        for (var i = 0; i < 4; i++)
        {
            var answer = shuffledAnswers[i];
            var abutton = new AnswerButton(Main.topContainer, answer, x[i], y[i], this);
            this.addComponent(abutton);
            this.abuttons.push(abutton);
        }

        this.ui.levelStart();

        if (Config.ANIMATION) new LevelShowCommand(this);
    },

    levelAbort: function() {
        this.removeComponent(this.painting);
        this.removeAButtons();
    },

    removeAButtons: function() {
        while (this.abuttons.length > 0) {
            var abutton = this.abuttons.pop();
            this.removeComponent(abutton);
        }
    },

    getCorrectButton: function() {
        var correctAnswer = this.curLevel.getAnswers()[0];
        for (var i = 0; i < this.abuttons.length; i++) {
            var abutton = this.abuttons[i];
            if (abutton.text === correctAnswer) return abutton;
        }
        return undefined;
    },


    playerAnswered: function(playerAnswer) {
        this.playerAnswer = playerAnswer;

        new PlayerAnsweredCommand(this);
    },

    getNumCorrectAnswers: function()
    {
        var correctAnswers = 0;
        for (var i = 0; i < this.levels.length; i++)
        {
            var level = this.levels[i];
            if (level.playerCorrect) correctAnswers++;
        }
        return correctAnswers;
    },

    getTotalLevels: function()
    {
        return this.levels.length;
    },

    playClick: function(bt, thisRef) {

        //console.log("play!");
        //Main.removeViewByClass(MainMenu);
        //Main.addView( new Game() );
    }

});