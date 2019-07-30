jQuery("#scoresbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<ul>" +
 "<li>" + "Fenicottero rosa" + "</li>" +
 "<li>" + "Fenicottero verde" + "</li>" +
 "<li>" + "Fenicottero viola" + "</li>" +
 "</ul>"
 );
});
jQuery("#creditsbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Fatto dal fenicottero verde!" + "</div>"
 );
});
jQuery("#helpbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<ul>"
 + "<li>" + "Premi spazio per volare" + "</li>"
 + "<li>" + "Allontanati dalle pietre, sennó il tuo fenicottero gemello dovrá cominciare il percorso un' altra volta!" + "</li>"
 + "</ul>"
);
});
