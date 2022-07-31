import chevron
from sparrow import rel_to_abs


def write_targe_path(target_path: str, content: str):
    with open(target_path, 'w') as f:
        f.write(content)


def get_ip(item='inner'):
    if item == 'inner':
        import socket
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(('8.8.8.8', 80))
            return s.getsockname()[0]
    else:
        import requests
        return requests.get('http://ifconfig.me/ip', timeout=1).text.strip()


class expand_template:
    def __init__(self, name: str, out: str, substitutions: dict, template: str):
        self.name = name
        self.out = out
        self.substitutions = substitutions
        self.template = template
        self._gen_code()

    def _gen_code(self):
        with open(rel_to_abs(self.template, return_str=True), 'r') as f:
            result = chevron.render(f, self.substitutions)
            print(result)
            write_targe_path(rel_to_abs(self.out, return_str=True), result)
