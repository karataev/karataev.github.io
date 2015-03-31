/**
 * Created by postepenno on 31.03.2015.
 */

$(document).ready(function() {
    var data = [
        {
            title:"Ордена ВОВ",
            url:"/orden/index.html"
        },
        {
            title:"Ню или не ню?",
            url:"/nu/index.html"
        },
        {
            title:"Большая двадцатка",
            url:"/g20/index.html"
        },
        {
            title:"Мелочь, а приятно",
            url:"/meloch/index.html"
        },
        {
            title:"Советские плакаты",
            url:"/ussr/index.html"
        }
    ];

    var rawTemplate =
        "<ul>" +
        "{{#each this}}" +
        "<li><a href='{{url}}'>{{title}}</a></li>" +
        "{{/each}}" +
        "</ul>";

    var compiledTemplate = Handlebars.compile(rawTemplate);
    $(".menu-container").append(compiledTemplate(data));
});