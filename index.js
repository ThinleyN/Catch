function addEventsForNav() {
    const navText = document.getElementsByClassName("navigation-text");

    $(navText).each(function(i,nav) {
        nav.addEventListener("click", function() {
            const navData = $(nav).attr("data");
            const textArea = $(`#${navData}`);
            textArea.css("visibility","visible");
            textArea.css("display","none");
            textArea.slideDown(3000);
            // mainAnimation.resume();
            if(!mainAnimation){
                animate();
            }else{
                mainAnimation.resume();
            }
            if(!lastRun){
                setTimeout(function(){
                    mainAnimation.pause();
                },3000)
            }
        })
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
    // animate();

}

document.addEventListener("DOMContentLoaded", onload);
