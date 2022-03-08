function addEventsForNav() {
    const navText = document.getElementsByClassName("navigation-text");

    $(navText).each(function(i,nav) {
        nav.addEventListener("click", function() {
            const navData = $(nav).attr("data");
            const textArea = $(`#${navData}`);
            textArea.css("visibility","visible");
            const text = textArea[0].innerHTML;
            textArea.empty();
            showLetterbyLetter(textArea,text,0,20);
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
