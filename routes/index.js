
/*
 * GET home page.
 */
var fs = require('fs');
var jade = require('jade');
var S = require("string");

function get_posts_synced(dir){
    var posts_dir = 'views/posts/';
    files = fs.readdirSync(posts_dir);

    posts = [];
    var f = "";
    for(i in files){
        f = posts_dir + files[i];
        console.log(f);
        if(!S(f).endsWith('.jade'))
            continue;
        posts.push(jade.renderFile(f, {filename: f}));
        console.log(jade.renderFile(f, {filename: f}));
    }

    return posts;
}

exports.index = function(req, res){
    if (req.xhr){
        res.json({data: 'ajax call'});
    }

    posts = get_posts_synced();
    res.render('index', { blog_title: 'Rizit blog', posts: posts,
            scripts: ['jquery.min.js']});
};
