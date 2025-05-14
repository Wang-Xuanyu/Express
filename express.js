function express() {
  let arr = [];
  let obj = {get:[],post:[]};

  function use(fn) {
    arr.push(fn)
  }

  function get(url,fn) {
    obj.get.push({fn,url})
  }

  function post(url,fn) {
    obj.push.push({fn,url})
  }

  function app(req,res) {
    let {url,method} = req
    let i = 0;
    function next() {
        if(i<arr.length){
          let fn = arr[i++]
          fn(req,res,next)
          return
        }
        if (obj.get.length>0&&obj.get[0].url===url&&method==='GET')obj.get[0].fn(req,res)
        else if (obj.post.length>0&&obj.post[0].url===url&&method==='POST')obj.post[0].fn(req,res)
    }
    next()
  }

  app.get = get;
  app.use = use
  app.post = post
  return app;
}

module.exports = express;
