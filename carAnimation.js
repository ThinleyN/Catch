let mainAnimation = null;
function animate(){
    map                 = Snap('#main-path');
    train           = Snap('.circle');
    trainbbox       = train.getBBox();
    
    train_path = map;
    train_path_length  = Snap.path.getTotalLength(train_path);
    last_point          = train_path.getPointAtLength(train_path_length);
    
    mainAnimation = Snap.animate(train_path_length, 0, function( step ) {
                    moveToPoint = Snap.path.getPointAtLength( train_path, step );
                    x = moveToPoint.x - (trainbbox.width/2);
                    y = moveToPoint.y - (trainbbox.height/2);
                    train.transform('translate(' + x + ',' + y + ') rotate('+ (moveToPoint.alpha - 90)+', '+trainbbox.cx+', '+trainbbox.cy+')');
                },30000, null ,function(){
                    train_move_up();
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