import http.server
import socketserver

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.error_message_format = None  # skip default error body
            try:
                with open("404.html", "rb") as f:
                    content = f.read()
                self.send_response(404)
                self.send_header("Content-type", "text/html")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            except FileNotFoundError:
                pass  # fall back to default if 404.html doesn't exist
        super().send_error(code, message, explain)

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
