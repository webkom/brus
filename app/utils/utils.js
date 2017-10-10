import styles from './utils.css'

export function calculateBalance(user){
  user.balance = user.transactions.reduce((a, b) => (a + b.value), 0);
}

export function getValueClass(value){
  return value < 0 ? styles.valueNegative : styles.value;
}
