var express = require('express'),
    router  = express.Router(),
    mongojs = require('mongojs'),
    db      = mongojs('mongodb://macnin:macnin@ds031607.mlab.com:31607/datalist', ['tasks']);

/***********************************/
/*          SELECT ALL             */
/***********************************/
router.get('/tasks', function(req, res, next)
{
    db.tasks.find(function(err, tasks)
    {
        /* Si hay un error lo imprimimos */
        if(err) res.send(err);
        /* Devolvemos el resultado */
        res.json(tasks);
    });
});
/***********************************/
/*          SELECT BY ID           */
/***********************************/
router.get('/task/:id', function(req, res, next)
{
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task)
    {
        /* Si hay un error lo imprimimos */
        if(err) res.send(err);
        /* Devolvemos el resultado */
        res.json(task);
    });
});
/***********************************/
/*         INSERT NEW ELEMENT      */
/***********************************/
router.post('/task', function(req, res, next)
{
    var task = req.body;
    if(!task.title || !(task.isDone + ''))
    {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else
    {
        db.tasks.save(task, function(err, task)
        {
            if(err)
            {
                res.send(err);
            }
            res.json(task);
        });
    }
});
/***********************************/
/*          DELETE BY ID           */
/***********************************/
router.delete('/task/:id', function(req, res, next)
{
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task)
    {
        /* Si hay un error lo imprimimos */
        if(err) res.send(err);
        /* Devolvemos el resultado */
        res.json(task);
    });
});
/***********************************/
/*         UPDATE BY ID            */
/***********************************/
router.put('/task/:id', function(req, res, next)
{
    var task = req.body;
    var updTask = {};

    if(task.isDone)
        updTask.isDone = task.isDone;

    if(task.title)
        updTask.title = task.title;

    if(!updTask)
    {
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else
    {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task)
        {
            if(err) res.send(err);

            res.json(task);
        });
    }
});

module.exports = router;