import React from 'react'
import { AdvantagesProps } from './Advantages.props'
import styles from './Advantages.module.css'
import CheckIcon from './CheckIcon.svg'

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(advantage => (
				<div className={styles.advantage} key={advantage._id}>
					<CheckIcon />
					<div className={styles.title}>{advantage.title}</div>
					<hr className={styles.vLine} />
					<div>{advantage.description}</div>
				</div>))}
		</>
	)
}
