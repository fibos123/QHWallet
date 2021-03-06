import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@ant-design/react-native'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { colors, fontStyles } from '../../../../styles/common'
import { renderFromWei } from '../../../../utils/number'
import { getTicker } from '../../../../utils/transactions'
import Identicon from '../../Identicon'

const styles = StyleSheet.create({
  account: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey100,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 80,
  },
  disabledAccount: {
    opacity: 0.5,
  },
  accountInfo: {
    marginLeft: 15,
    marginRight: 0,
    flex: 1,
    flexDirection: 'row',
  },
  accountLabel: {
    fontSize: 18,
    color: colors.fontPrimary,
    ...fontStyles.normal,
  },
  accountBalanceWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  accountBalance: {
    paddingTop: 5,
    fontSize: 12,
    color: colors.fontSecondary,
    ...fontStyles.normal,
  },
  accountBalanceError: {
    color: colors.fontError,
    marginLeft: 4,
  },
  importedView: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: 2,
  },
  accountMain: {
    flex: 1,
    flexDirection: 'column',
  },
  selectedWrapper: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  importedText: {
    color: colors.grey400,
    fontSize: 10,
    ...fontStyles.bold,
  },
  importedWrapper: {
    width: 73,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey400,
  },
})

/**
 * View that renders specific account element in AccountList
 */
export default class AccountElement extends PureComponent {
  static propTypes = {
    /**
     * Callback to be called onPress
     */
    onPress: PropTypes.func.isRequired,
    /**
     * Callback to be called onLongPress
     */
    onLongPress: PropTypes.func.isRequired,
    /**
     * Current ticker
     */
    ticker: PropTypes.string,
    /**
     * Whether the account element should be disabled (opaque and not clickable)
     */
    disabled: PropTypes.bool,
    item: PropTypes.object,
  }

  onPress = () => {
    const { onPress } = this.props
    const { index } = this.props.item
    onPress && onPress(index)
  }

  onLongPress = () => {
    const { onLongPress } = this.props
    const { address, isImported, index } = this.props.item
    onLongPress && onLongPress(address, isImported, index)
  }

  render() {
    const { disabled } = this.props
    const { address, balance, ticker, name, isSelected, isImported, balanceError } = this.props.item
    const selected = isSelected ? <Icon name="check-circle" size={30} color={colors.blue} /> : null
    const imported = isImported ? (
      <View style={styles.importedWrapper}>
        <Text numberOfLines={1} style={styles.importedText}>
          {strings('accounts.imported')}
        </Text>
      </View>
    ) : null
    return (
      <TouchableOpacity
        style={[styles.account, disabled ? styles.disabledAccount : null]}
        key={`account-${address}`}
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        disabled={disabled}>
        <Identicon address={address} diameter={38} />
        <View style={styles.accountInfo}>
          <View style={styles.accountMain}>
            <Text numberOfLines={1} style={[styles.accountLabel]}>
              {name}
            </Text>
            <View style={styles.accountBalanceWrapper}>
              <Text style={styles.accountBalance}>
                {renderFromWei(balance)} {getTicker(ticker)}
              </Text>
              {!!balanceError && <Text style={[styles.accountBalance, styles.accountBalanceError]}>{balanceError}</Text>}
            </View>
          </View>
          {!!imported && <View style={styles.importedView}>{imported}</View>}
          <View style={styles.selectedWrapper}>{selected}</View>
        </View>
      </TouchableOpacity>
    )
  }
}
