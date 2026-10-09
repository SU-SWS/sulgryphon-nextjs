"use client"

import {JSX, ThHTMLAttributes} from "react"
import {Table, Thead, Tbody, Tr, Th as BaseTh, Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

/**
 * v6 types `Th` with table attributes instead of header cell attributes, which rejects `scope`.
 * The component passes every prop through to the `<th>`, so only the type needs correcting.
 */
const Th = BaseTh as (props: ThHTMLAttributes<HTMLTableCellElement>) => JSX.Element

export {Table, Thead, Tbody, Tr, Th, Td}
