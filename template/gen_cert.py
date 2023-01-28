from sparrow.utils.net import get_outer_ip, get_inner_ip
import shutil
import os
os.system(f"mkcert localhost {get_inner_ip()} {get_outer_ip()} localhost 127.0.0.1 ::1")
shutil.move(src="localhost+5-key.pem", dst='web/apps/chatroom/ca/key.pem')
shutil.move(src="localhost+5.pem", dst='web/apps/chatroom/ca/cert.pem')
