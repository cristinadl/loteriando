from flask import Flask,request,jsonify
import os 
import urllib.request
from flask_cors import CORS
from werkzeug.utils import secure_filename



app = Flask(__name__)
cors = CORS(app, origins="*")


UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
  
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
  
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/users", methods=['GET', 'POST'])

def users():
    return jsonify(
        {
            "users": [
                'arpan',
                'zach',
                'jessie'
            ]
        }
    )

@app.route("/upload", methods = ['POST'])

def upload_image():
    if 'files[]' not in request.files:
        response = jsonify({
            "message": "No file part in request",
            "status": "failed"
        })
        response.status_code = 400
        return response
    
    files = request.files.getlist('files[]')

    success = False
    errors = {}

    for file in files:      
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            response = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return response
    
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'successs'
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    
@app.route('/get-image',methods=["GET"])
def get_cut_img():
   response = make_response(send_file(file_path,mimetype='image/png'))
   response.headers['Content-Transfer-Encoding']='base64'
   return response 

if __name__ == "__main__":
    app.run(debug=True, port=8080)