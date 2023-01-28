from sparrow.utils.net import get_ip
from sparrow.template import expand_template
from sparrow import relp


def build_template(template_file: str, ip_type='inner'):
    expand_template(
        name='config_gen.ts',
        out=template_file,
        substitutions={
            'websocket_ip': get_ip(ip_type),
            'grpc_ip': get_ip(ip_type),
        },
        template=relp('./config.template.ts'),
    )


ip_type = 'inner'
# ip_type = 'outer'
build_template(relp('../web/apps/chatroom/src'), ip_type)
build_template(relp('../web/apps/chatroom-new/src'), ip_type)
