const request = require('request');
const cors = require('cors');
const express = require('express')
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

function apiCall(reqOps) {
  return new Promise((resolve, reject) => {

    request(reqOps, (err, res, body) => {

      if (!err && res.statusCode == 200) {
        resolve(JSON.parse(body));
      }

      reject(err);
    });

  });
}

// Page with all universities
app.get('/universities', function (req, res) {
  request.get('http://persistence:5000/universities', function (error, response, body) {
    if (response.statusCode == 200) {
      res.send(response.body);
    } else {
      res.send({ "Status": 500 });
    }
  });
})

// Page with University details
app.get('/university/:id', function (req, res) {

  var universityReq = {
    url: 'http://persistence:5000/university/' + req.params["id"],
    method: 'GET'
  };

  var depsReq = {
    url: 'http://persistence:5000/departments/' + req.params["id"],
    method: 'GET'
  };

  let university, departments;

  apiCall(universityReq).then(result => {

    university = result;
    return apiCall(depsReq);

  }).then(result => {

    departments = result;
    res.send({ "University": university, "Departments": departments });

  }).catch(error => {

    console.log("Error occured in one of the API call: ", error);
    res.send({ "Status": 500 });
  });
})

// Page with Department details
app.get('/department/:id', function (req, res) {
  var departmentReq = {
    url: 'http://persistence:5000/department/' + req.params["id"],
    method: 'GET'
  };

  var coursesReq = {
    url: 'http://persistence:5000/courses/' + req.params["id"],
    method: 'GET'
  };

  let department, courses;

  apiCall(departmentReq).then(result => {

    department = result;
    return apiCall(coursesReq);

  }).then(result => {

    courses = result;
    res.send({ "Department": department, "Courses": courses });

  }).catch(error => {

    console.log("Error occured in one of the API call: ", error);
    res.send({ "Status": 500 });
  });
})

// Page with Course Details
app.get('/course/:id', function (req, res) {
  var courseReq = {
    url: 'http://persistence:5000/course/' + req.params["id"],
    method: 'GET'
  };

  var textbooksReq = {
    url: 'http://persistence:5000/textbooks/' + req.params["id"],
    method: 'GET'
  };

  let course, textbooks;

  apiCall(courseReq).then(result => {

    course = result;
    return apiCall(textbooksReq);

  }).then(result => {

    textbooks = result;
    res.send({ "Course": course, "Textbooks": textbooks });

  }).catch(error => {

    console.log("Error occured in one of the API call: ", error);
    res.send({ "Status": 500 });
  });
})

// Page with Textbook Details
app.get('/textbook/:id', function (req, res) {
  request.get('http://persistence:5000/textbook/' + req.params["id"], function (error, response, body) {
    if (response.statusCode == 200) {
      res.send(response.body);
    } else {
      res.send({ "Status": 500 });
    }
  });
})

// Page with all orders
app.get('/orders', function (req, res) {
  request.get('http://persistence:5000/orders', function (error, response, body) {
    if (response.statusCode == 200) {
      res.send(response.body);
    } else {
      res.send({ "Status": 500 });
    }
  });
})

//Page with order details
app.get('/orders/:id', function (req, res) {
  var orderReq = {
    url: 'http://persistence:5000/order/' + req.params["id"],
    method: 'GET'
  };

  let email, textbook;

  apiCall(orderReq).then(result => {
    email = result[0].email;

    var textbookReq = {
      url: 'http://persistence:5000/textbooks/' + result[0].textbook,
      method: 'GET'
    };

    return apiCall(textbookReq);

  }).then(result => {
    textbook = result[0];
    console.log(email);
    console.log(textbook);
    res.send({ "Email": email, "Textbook": textbook });

  }).catch(error => {

    console.log("Error occured in one of the API call: ", error);
    res.send({ "Status": 500 });
  });
})

// Make an order for textbook
app.post('/order', function (req, res) {
  var options = {
    method: 'post',
    body: req.body,
    json: true,
    url: 'http://persistence:5000/order/new'
  }
  request(options, function (error, response, body) {
    if (response.statusCode == 200) {
      console.log(response.body);
      res.send({"data" : response.body});
    } else {
      res.send({ "Status": 500 });
    }
  });
})

// Edit an order for textbook
app.put('/order/:id', function (req, res) {
  request.put('http://persistence:5000/order/edit/' + req.params['id'], { form: { data: req.body } }, function (error, response, body) {
    if (response.statusCode == 200) {
      res.send(response.body);
    } else {
      res.send({ "Status": 500 });
    }
  });
})

// Delete an order for textbook
app.delete('/order/:id', function (req, res) {
  request.delete('http://persistence:5000/order/delete/' + req.params['id'], function (error, response, body) {
    if (response.statusCode == 200) {
      res.send(response.body);
    } else {
      res.send({ "Status": 500 });
    }
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
