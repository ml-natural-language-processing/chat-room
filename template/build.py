from utils import expand_template, get_ip

expand_template(
    name='expand_ts_config',
    template='./config.template.ts',
    out="../web/apps/chatroom/src/config_gen.ts",
    substitutions={
        'websocket_ip': get_ip('inner'),
        # 'websocket_ip': get_ip('outer'),
    },
)
