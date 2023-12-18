from flask import Flask, Response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
from multiprocessing import Process
import cv2
import base64
app = Flask(__name__)
CORS(app)

camera_ip=None
def generate_frames():
    global camera_ip
    camera = cv2.VideoCapture(camera_ip,cv2.CAP_FFMPEG)
    while True:
        success, first_frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', first_frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
    camera_ip = None

# API gửi Camera URL cho web
@app.route('/start_camera', methods=['POST'])
def start_camera():
    global camera_ip

    if 'camera_ip' in request.json:
        camera_ip = request.json['camera_ip']

        return jsonify({'message': 'Camera started successfully'})
    else:
        return jsonify({'error': 'Invalid camera IP'})

# API show video cho web
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# API chụp màn hình cho web 
@app.route('/capture', methods=['POST'])
def capture():
    data = request.json
    print(data)
    camera_ip =data['camera_ip']
    camera = cv2.VideoCapture(camera_ip, cv2.CAP_FFMPEG)
    camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    if (not camera.isOpened()):
        return jsonify({"error": "Failed to open image"})
    # Sử dụng camera_ip để thực hiện các tác vụ cần thiết
    temp = 1
    while True:
        success, frame = camera.read()
        temp+=1
        if temp==20:
            break
    

    if success:
        _, buffer = cv2.imencode('.jpg', frame)
        image_base64 = base64.b64encode(buffer).decode('utf-8')
        return jsonify({"image": image_base64})
    else:
        return jsonify({"error": "Failed to capture image"})


if __name__ == '__main__':
    os.environ["opencv_ffmpeg_capture_options"] = "rtsp_transport;udp"
    app.run(debug=True)
