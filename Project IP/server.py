
from http.server import HTTPServer, BaseHTTPRequestHandler
import requests
import urllib.parse


class HelloHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/reviews":
            try:
                with open("form_data.txt", "r") as file:
                    form_data = file.readlines()
            except FileNotFoundError:
                form_data = []

            content = ""
            for line in form_data:
                if line.startswith("Array "):
                    content += f"{line.strip()}"
                else:
                    content += "<hr>"
            content = content.rstrip("<hr>")

            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin",
                             "*")
            self.send_header("Access-Control-Allow-Methods", "GET")
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(content.encode())
        else:
            with open("index.html", "rb") as file:
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(file.read())

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode()

        fname = post_data.split('&')[0].split('=')[1]
        lname = post_data.split('&')[1].split('=')[1]
        email = urllib.parse.unquote_plus(
            post_data.split('&')[2].split('=')[1])

        age = post_data.split('&')[3].split('=')[1]
        country = post_data.split('&')[4].split('=')[1]
        rating = post_data.split('&')[5].split('=')[1]
        comment = post_data.split('&')[6].split('=')[1].replace('+', ' ')
        print(
            f'Received form submission: First Name: {fname}, Last Name: {lname}, Email: {email}, Age: {age}, Country: {country}, Rating: {rating}, Comment: {comment}')
        # Create a list with the form data
        form_data = [
            f'First Name: {fname}',
            ' ',
            f'Last Name: {lname}',
            ' ',
            f'Email: {email}',
            ' ',
            f'Age: {age}',
            ' ',
            f'Country: {country}',
            ' ',
            f'Rating: {rating}',
            ' ',
            f'Comment: {comment}',
            ''
        ]

        # Read existing form data from file, if any
        existing_data = []
        try:
            with open('form_data.txt', 'r') as file:
                existing_data = file.readlines()
        except FileNotFoundError:
            pass

        # Check if the last entry in the existing data is an empty line
        if existing_data and existing_data[-1] != '\n':
            existing_data.append('\n')

        # Find the last array number used in the existing data
        last_array_number = 0
        for line in existing_data:
            if line.startswith('Array '):
                array_number = int(line.split(':')[0].split(' ')[1])
                if array_number > last_array_number:
                    last_array_number = array_number

        # Increment the array number for the new form data
        new_array_number = last_array_number + 1

        # Append the new form data to the list
        existing_data.append('Array {}:'.format(new_array_number))
        existing_data.extend(form_data)

        # Write the updated form data to the text file
        with open('form_data.txt', 'w') as file:
            file.write(''.join(existing_data))

        # Send a response
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()

        success_message = """
        <!DOCTYPE html>
        <html lang='en'>
        <body>
            <h1>Form submitted successfully!</h1>
            <h3>Thank you for your Reviewing.</h3>
            <a href="http://localhost:5500/index.html"><button>Go to Home</button></a>
        </body>
        </html>     
        """
        self.wfile.write(success_message.encode())


if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, HelloHandler)
    httpd.serve_forever()
