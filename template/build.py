from utils import expand_template, get_ip
from sparrow.net import get_outer_ip, get_inner_ip

expand_template(
    name='expand_ts_config',
    template='./config.template.ts',
    out="../web/apps/chatroom/src/config_gen.ts",
    substitutions={
        'websocket_ip': get_inner_ip(),
        'grpc_ip': get_inner_ip(),
        # 'websocket_ip': get_outer_ip(),
        # 'grpc_ip': get_outer_ip(),
    },
)
