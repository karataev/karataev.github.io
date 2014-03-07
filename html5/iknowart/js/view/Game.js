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

        this.levelStart(0);
    },

    createLevels: function()
    {
        this.levels = [];
        this.addLevel("italianPolden", ["ВИНОГРАД", "ЛАМПОЧКА", "КРЫСА", "МОРКОВКА"], 18, -228, 1.39, "Карл Брюллов. Итальянский полдень, 1827");
        this.addLevel("alenushka", ["ДЕВОЧКА", "МЕДВЕДЬ", "РЫБАК", "ПИАНИНО"], -26, 78, 2.06, "Виктор Васнецов. Аленушка, 1881");
        this.addLevel("skelet", ["СИГАРЕТА", "ТРУБКА", "УСЫ", "СВИСТОК"], 90, 46, 1.38, "Винсент ван Гог. Скелет с сигаретой, 1886");
        this.addLevel("sunday", ["СОБАКА", "МАРТЫШКА", "КОШКА", "ЗМЕЯ"], -165, 180, 1, "Жорж-Пьер Сера. Воскресный день на острове Гранд-Жатт, 1884—1886");
        this.addLevel("redtower", ["КРАСНАЯ БАШНЯ", "ТОРГОВЫЙ ЦЕНТР", "ГОДЗИЛЛА", "ЖИРАФЫ"], -164, -40, 2, "Джорджо де Кирико. Красная башня, 1913");
        this.addLevel("dog", ["СОБАКА", "ПЕРИСКОП", "КРОТ", "КАКАШКА"], -85, 200, 1.17, "Франциско Гойя. Собака, 1819—1823");
        this.addLevel("9val", ["ЛЮДИ", "ДЕЛЬФИН", "НЕФТЯНАЯ ПЛАТФОРМА", "РУСАЛКА"], -85, 247, 1.09, "Иван Айвазовский. Девятый вал, 1850");
        this.addLevel("arnolfini", ["ТАПОЧКИ", "СОБАКА", "ТАРАКАН", "ГАНТЕЛИ"], 9, 239, 1, "Ян ван Эйк. Портрет четы Арнольфини, 1434");
        this.addLevel("hunters", ["ПТИЦА", "ДРАКОН", "ВОЗДУШНЫЙ ЗМЕЙ", "ЗАМОК"], 197, -179, 1, "Питер Брейгель Старший. Охотники на снегу, 1565");
        this.addLevel("vangog", ["ВАН ГОГ", "МАЛЕВИЧ", "РАФАЭЛЬ", "ДА ВИНЧИ"], 0, -54, 1.17, "Винсент ван Гог. Автопортрет с перевязанным ухом и трубкой, 1889");
        this.addLevel("garden", ["ЗАЯЦ", "ВЛАДИМИР ПУТИН", "ДЯТЕЛ", "КИТ"], -1, -136, 1, "Иероним Босх. Сад земных наслаждений, 1500-1510");
        this.addLevel("mart", ["ЛОШАДЬ", "МЕРСЕДЕС", "ПОРТАЛ", "КОРОВА"], -48, 117, 1.06, "Исаак Левитан. Март, 1895");
        this.addLevel("grachi", ["ПТИЦА", "САПОГ", "МАЛЬЧИК", "ТАНК"], -253, 247, 0.59, "Алексей Саврасов. Грачи прилетели, 1871");
        this.addLevel("girlWithPeaches", ["ТАРЕЛКА", "ЧАСЫ", "КАРТИНА", "ГОЛОВА ОЛЕНЯ"], -140, -260, 1, "Валентин Серов. Девочка с персиками, 1887");
        this.addLevel("sunrise", ["СОЛНЦЕ", "НЛО", "МЕТЕОРИТ", "ЮПИТЕР"], 152, -137, 0.62, "Клод Моне. Впечатление. Восходящее солнце, 1872");
        this.addLevel("madonna", ["АНГЕЛ", "КУВШИН", "ДЕМОН", "КОШКА"], -95, -141, 1.64, "Рафаэль. Сикстинская Мадонна, 1512—1513");
        this.addLevel("gornostai", ["ГОРНОСТАЙ", "ТАКСА", "КРЫСА", "ДИНОЗАВР"], 40, 140, 1.64, "Леонардо да Винчи. Дама с горностаем, 1489–1490");
        this.addLevel("players", ["КАРТЫ", "КОЛБАСА", "АЙФОНЫ", "ПЕЛЬМЕНИ"], 0, 29, 1.17, "Поль Сезанн. Игроки в карты, 1894-1895");
        this.addLevel("serezhka", ["СЕРЕЖКА", "ТАТУИРОВКА", "ШРАМ", "СЛУХОВОЙ АППАРАТ"], 48, 9, 1.03, "Ян Вермеер. Девушка с жемчужной сережкой, ок. 1665");
        this.addLevel("suprem", ["СИНИЙ КВАДРАТ", "РОЗОВЫЙ КРУГ", "ЗЕЛЕНЫЙ ЦИЛИНДР", "ЧЕРНАЯ ДЫРА"], 40, -44, 2.6, "Казимир Малевич. Супрематическая композиция, 1916");
    },

    addLevel: function(asset, answers, stickerX, stickerY, stickerScale, description)
    {
        var id = this.levels.length;
        this.levels.push( new Level(id, asset, answers, stickerX, stickerY, stickerScale, description) );
    },

    levelStart: function(id)
    {
        this.curLevel = this.levels[id];

        var x = [15, 325, 15, 325];
        var y = [820, 820, 890, 890];
        this.abuttons = [];

        var shuffledAnswers = this.curLevel.answers.slice(0);
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
        for (var i = 0; i < this.abuttons.length; i++) {
            var abutton = this.abuttons[i];
            if (abutton.text === this.curLevel.answers[0]) return abutton;
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