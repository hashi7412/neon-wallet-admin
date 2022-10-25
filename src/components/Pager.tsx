import React from 'react'
import './pager.scss'

interface PagerProps {
	page:       number
	total:      number
	onChange:   (page: number) => void
}

const Pager = ({page, total, onChange}: PagerProps) => {
	const setPage = (page: number) => {
		if (page > total - 1) page = total - 1
		if (page < 0) page = 0
		onChange(page)
	}
	
	return (
		<div className='pager'>
			<button className='btn btn-primary' onClick={() => setPage(0)} disabled={total===0 || page===0}>
			<svg fill="currentColor" viewBox="0 0 800 800" height="10" width="10">
				<path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
			</svg>
			</button>
			<button className='btn btn-primary' onClick={() => setPage(page - 1)} disabled={total===0 || page===0}>
				<svg fill="currentColor" viewBox="0 0 320 512" height="10" width="10">
					<path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/>
				</svg>
			</button>
			<code className='btn gray d-center gap'>
				Page<span className='light'>{" "}{page + 1}{" "}</span>of {total || 1}
			</code>
			<button className='btn btn-primary' onClick={() => setPage(page + 1)} disabled={total===0 || page===total - 1}>
				<svg fill="currentColor" viewBox="0 0 320 512" height="10" width="10">
					<path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
				</svg>
			</button>
			<button className='btn btn-primary' onClick={() => setPage(total - 1)} disabled={total===0 || page===total - 1}>
				<svg fill="currentColor" viewBox="0 0 800 800" height="10" width="10">
					<path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path>
				</svg>
			</button>
		</div>
	)
}

export default Pager