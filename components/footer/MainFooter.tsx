import styles from './footer.module.css'
import {Tag, Typography} from "antd";

export default function MainFooter() {
    return (
        <span>
            <Tag className={styles.author}>
                Created by banban | Jan, 2023
            </Tag>
            <Tag className={styles.stack}>
                Tech stacks: Nextjs, Redux Toolkit, Antd
            </Tag>
        </span>
    )
}