import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import RocketChat from '../../lib/rocketchat';
import Touchable from './Touchable';
import { BUTTON_HIT_SLOP } from './utils';
import styles from './styles';
import I18n from '../../i18n';
import { CustomIcon } from '../../lib/Icons';
import { themes } from '../../constants/colors';

const PersonalCallButtons = React.memo(({
	theme, callJitsi, rid
}) => {
	const rejectJitsi = () => {
		RocketChat.cfJitsiCloseCall(rid, true).catch(e => console.log(e));
	};
	const acceptJitsi = () => {
		RocketChat.cfJitsiAcceptCall(rid, true).catch(e => console.log(e));
		callJitsi();
	};
	return (
		<View style={styles.buttonContainer}>
			<Touchable
				onPress={acceptJitsi}
				background={Touchable.Ripple(themes[theme].bannerBackground)}
				style={[styles.button, { backgroundColor: 'green' }]}
				hitSlop={BUTTON_HIT_SLOP}
			>
				<>
					<CustomIcon name='phone' size={16} style={styles.buttonIcon} color={themes[theme].buttonText} />
					<Text style={[styles.buttonText, { color: themes[theme].buttonText }]}>{I18n.t('CF_accept_call')}</Text>
				</>
			</Touchable>
			<Touchable
				onPress={rejectJitsi}
				background={Touchable.Ripple(themes[theme].bannerBackground)}
				style={[styles.button, { backgroundColor: 'red', margin: 10 }]}
				hitSlop={BUTTON_HIT_SLOP}
			>
				<>
					<CustomIcon name='phone-end' size={16} style={styles.buttonIcon} color={themes[theme].buttonText} />
					<Text style={[styles.buttonText, { color: themes[theme].buttonText }]}>{I18n.t('CF_refuse_call')}</Text>
				</>
			</Touchable>
		</View>
	);
});

PersonalCallButtons.propTypes = {
	theme: PropTypes.string,
	callJitsi: PropTypes.func,
	rid: PropTypes.string
};
PersonalCallButtons.displayName = 'CallButton';

export default PersonalCallButtons;
