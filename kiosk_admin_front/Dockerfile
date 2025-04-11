FROM nginx:latest

# ✅ React build 결과 복사 (kiosk_front 포함)
COPY build/ /usr/share/nginx/html/

# ✅ Nginx 설정 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf
