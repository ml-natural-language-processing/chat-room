from sparrow.utils.net import get_ip
from sparrow.template import expand_template
from sparrow import relp, yaml_load

config = yaml_load('../backend/config.yaml', rel_path=True)


def build_template(template_file: str, ip_type='inner'):
    expand_template(
        name='config_gen.ts',
        out=template_file,
        substitutions={
            'ws_ip': get_ip(ip_type),
            'grpc_ip': get_ip(ip_type),
            'ws_port': config['ws_port'],
            'grpc_port': config['grpc_port_out'],
        },
        template=relp('./config.template.ts'),
    )


ip_type = 'inner'
# ip_type = 'outer'
build_template(relp('../web/apps/chatroom/src'), ip_type)
build_template(relp('../web/apps/chatroom-new/src'), ip_type)
