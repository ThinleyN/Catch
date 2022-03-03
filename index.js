let mainAnimation = null;
let lastPoint  = null;

function randomizePositionText() {
    const content = document.getElementById("content");
    const styleOfContent = getComputedStyle(content);
    const heightOftContent = parseInt(styleOfContent.height,10) ;
    const widthOfContent = parseInt(styleOfContent.width,10);
    const contentEdges = content.getBoundingClientRect();

    const textAreas = document.getElementsByClassName("text-area");
    for(let i = 0; i < textAreas.length;i++){
        const top =  Math.floor(Math.random() * (heightOftContent/2 - 0 + 1) + 0);
        const left =  Math.floor(Math.random() * (widthOfContent/2 - 0 + 1) + 0);

        textAreas.item(i).style.top = top + 'px';
        textAreas.item(i).style.left = left + 'px';
        if(getComputedStyle(textAreas.item(i)).width === widthOfContent + 'px'){
            textAreas.item(i).style.left = 0 + 'px';
        }
        
        const boundingArea = textAreas.item(i).getBoundingClientRect();
        if(boundingArea.right > contentEdges.right){
            textAreas.item(i).style.left = 0 +'px';
        }

        if(boundingArea.top + boundingArea.height > contentEdges.top + contentEdges.height){
            textAreas.item(i).style.top = 0 +'px';
        }

    }
}

function addEventsForNav() {
    const navText = document.getElementsByClassName("navigation-text");

    $(navText).each(function(i,nav) {
        nav.addEventListener("click", function() {
            const navData = $(nav).attr("data");
            const textArea = $(`#${navData}`);
            textArea.css("visibility","visible");
            textArea.css("display","none");
            textArea.slideDown(2000);
            mainAnimation.resume()
        })
    });
}

function animate(){
map                 = Snap('#main-path');
spaceship           = Snap('.circle');
spaceshipbbox       = spaceship.getBBox();
console.log(spaceshipbbox,spaceship,"asdf")

flight_path = map;
console.log(flight_path,"flight")
flight_path_length  = Snap.path.getTotalLength(flight_path);
console.log(flight_path_length,"finee")
last_point          = flight_path.getPointAtLength(flight_path_length);

mainAnimation = Snap.animate(0, flight_path_length, function( step ) {
                moveToPoint = Snap.path.getPointAtLength( flight_path, step );
                x = moveToPoint.x - (spaceshipbbox.width/2);
                y = moveToPoint.y - (spaceshipbbox.height/2);
                spaceship.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+spaceshipbbox.cx+', '+spaceshipbbox.cy+')');
            },3000, mina.easeout ,function(){
                // ship_move_up();
            });
}

function onload() {
    const content = document.getElementById("content");
    const arbTrack =  document.getElementById("arb-track");

    const styleOfContent = getComputedStyle(content);

    arbTrack.style.width = styleOfContent.width;
    arbTrack.style.height = styleOfContent.height;

    randomizePositionText();

    addEventsForNav();
    animate();

}

document.addEventListener("DOMContentLoaded", onload);



function ship_move_up(){
    spaceship.animate({'transform': 'translate(' + (last_point.x - (spaceshipbbox.width/2)) + ',' + (last_point.y - (spaceshipbbox.height / 2) - 20) + ')'},1300, function(){
        ship_move_down();
    });
}
function ship_move_down(){
    spaceship.animate({'transform': 'translate(' + (last_point.x - (spaceshipbbox.width/2)) + ',' + (last_point.y - (spaceshipbbox.height / 2)) + ')'},1100, function(){
        ship_move_up();
    });
}
// function animate_thruster_up(){
//     thruster.animate({'transform': 'translate(0,-5)'},100, function(){
//         animate_thruster_down();
//     });
// }
// function animate_thruster_down(){
//     thruster.animate({'transform': 'translate(0,0)'},100, function(){
//         animate_thruster_up();
//     });
// }