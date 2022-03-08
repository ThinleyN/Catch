let mainAnimation = null;
const lastRunStep = 30000;
let lastRun = false;
function animate(){
    const trainSVG = $('.train-svg');
    trainSVG.attr("x","0");
    trainSVG.attr("y","0");
    map                 = Snap('#main-path');
    train           = Snap('.circle');
    trainbbox       = train.getBBox();
    $('.circle').attr("transform","");
    lastRun = false;
    
    train_path = map;
    train_path_length  = Snap.path.getTotalLength(train_path);
    last_point          = train_path.getPointAtLength(train_path_length);
    
    mainAnimation = Snap.animate(0, train_path_length, function( step ) {
        if(step > lastRunStep){
            lastRun = true;
        }else{
            lastRun = false;
        }
        moveToPoint = Snap.path.getPointAtLength( train_path, step );
        x = moveToPoint.x - (trainbbox.width/2);
        y = moveToPoint.y - (trainbbox.height/2);
        train.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+trainbbox.cx+', '+trainbbox.cy+')');
    },masterSpeed*numberOfTextArea, null ,function(){
        // train_move_up();
        $('.train-svg').attr("x","999");
        $('.train-svg').attr("y","800");
        $('.circle').attr("transform", "");
        mainAnimation = null;
    });
}
    
function train_move_up(){
    train.animate({'transform': 'translate(' + (last_point.x - (trainbbox.width/2)) + ',' + (last_point.y - (trainbbox.height / 2) - 20) + ')'},1300, function(){
        train_move_down();
    });
}
function train_move_down(){
    train.animate({'transform': 'translate(' + (last_point.x - (trainbbox.width/2)) + ',' + (last_point.y - (trainbbox.height / 2)) + ')'},1100, function(){
        train_move_up();
    });
}