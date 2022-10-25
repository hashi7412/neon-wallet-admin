import React from "react"
import { CgExpand } from "react-icons/cg";
import Modal from "../components/Modal";
import Table, { TableHeader } from "../components/Table";
import useStore, { config, tips, toDate } from "../useStore";

// const customStyles = {
// 	rows: {
// 		style: {
// 			paddingTop: "10px",
// 			paddingBottom: "10px",
// 			color: "#eee",
// 			background: "#2c2c2c",
// 			fontSize: "16px",
// 			fontWeight: 700,
// 		},
// 	},
// 	headCells: {
// 		style: {
// 			paddingTop: "20px",
// 			paddingBottom: "20px",
// 			color: "#eee",
// 			background: "#122",
// 			fontSize: "20px",
// 			fontWeight: "bold",
// 			minHeight: "50px",
// 		},
// 	},
// 	pagination: {
// 		style: {
// 			fontSize: "14px",
// 			fontWeight: 600,
// 			color: "#eee",
// 			background: "#122",
// 		},
// 	},
// };

interface Contract {
	_uid: string
	user?: any
	contract: string
	owner: string
	companyName: string
	officialWebsite: string
	twitterHandle: string
	companyresidentialaddress: string
	phonenumber: string
	businessEmail: string
	businesslicensescreenshot: string
	tokenName?: string
	tokenSymbol?: string
	tokenDecimals?: string
	tokenTotalSupply?: string
	tokenimage: string
	tokentype: string
	totalmarketcap: string
	marketpair: string
	socialUrl: string[]
	created: number | string
	updated?: number | string
	status: "verified" | "rejected" | "accepted"
}

interface TokenStatus {
	activeToken: number
	adviceModal: boolean
}

interface TableStatus {
	data: any[]
	count: number
	page: number
	limit: number
	total: number
}

const initTblData = {
	data: [],
	count: 0,
	limit: 10,
	page: 0,
	total: 0,
}

const Tokens = () => {
	const { sendJson, showLoading, timeAgo } = useStore();

	const [page, setPage] = React.useState<number>(0);
	const [status, setStatus] = React.useState<TokenStatus>({
		activeToken: 0,
		adviceModal: false
	});
	const [tableStatus, setTableStatus] = React.useState<TableStatus>(initTblData);
	const [desc, setDesc] = React.useState<string>("");

	const fields = [
		{ key: 'contract', label: 'Address', render: (v: string) => (<a href={`https://scan.neonlink.io/address/${v}`}>{v}</a>) },
		{ key: 'tokenName', label: 'Name', render: (v: string) => (<span>{v}</span>) },
		{ key: 'tokenSymbol', label: 'Symbol', render: (v: string) => (<span>{v}</span>) },
		{ key: 'tokenDecimals', label: 'Decimals', render: (v: number) => (<span>{(v)}</span>) },
		{ key: 'status', label: 'Status', render: (v: string) => (<span className={`upper ${v === "verified" ? "success" : v === "rejected" ? "danger" : ""}`}>{(v)}</span>) },
		{ key: 'created', label: 'Date', render: (v: number) => (toDate(v)) },
		{ key: 'contract', label: 'Action', render: (v: string, i, k) => (<button className="btn-none mb0" onClick={() => { showDetail(k || 0) }}><CgExpand size={20} /></button>) }
	] as TableHeader[]

	const onData = async (page:number, limit:number) => {
		showLoading(true);
		sendJson("get-tokens", page, limit).then(res => {
			if (res.result) {
				const { data, count, total, page, limit } = res.result as { data: any[], count: number, total: number, page: number, limit: number }
				setTableStatus({
					...status, 
					data,
					count,
					limit,
					page,
					total,
				})
			}
			showLoading(false)
		})
		showLoading(false);
	}

	const goBack = async () => {
		setStatus({ ...status, adviceModal: false });
		setPage(0);
	}

	const showDetail = (i: number) => {
		setStatus({ ...status, activeToken: i });
		setPage(1);
		setDesc(tableStatus.data[i].description);
	}

	const accept = async () => {
		if (window.confirm(`Are you sure to accept the ${tableStatus.data[status.activeToken].tokenName} (${tableStatus.data[status.activeToken].tokenSymbol}) token?`)) {
			showLoading(true);
			const res = await sendJson("accept-token", tableStatus.data[status.activeToken].contract, desc);

			if (res.result) {
				tips(`${tableStatus.data[status.activeToken].tokenName} Accepted`);
				goBack();
				onData(tableStatus.page, tableStatus.limit);
			} else {
				tips("Network error");
			}
			showLoading(false);
		}
	}

	const reject = async () => {
		if (window.confirm(`Are you sure to reject the ${tableStatus.data[status.activeToken].tokenName} (${tableStatus.data[status.activeToken].tokenSymbol}) token?`)) {
			showLoading(true);
			const res = await sendJson("reject-token", tableStatus.data[status.activeToken].contract, desc);

			if (res.result) {
				tips(`${tableStatus.data[status.activeToken].tokenName} Rejected`);
				goBack();
				onData(tableStatus.page, tableStatus.limit);
			} else {
				tips("Network error");
			}
			showLoading(false);
		}
	}

	return (
		<>
			{page === 0 && (
				<div className="side-container">
					<h2>Tokens</h2>
					<div>
						{/*  */}
					</div>
					{/* <DataTable
						columns={columns}
						data={tableStatus.data}
						customStyles={customStyles}
						fixedHeader
						theme="solarized"
						pagination
						paginationPerPage={tableStatus.limit}
						onChangeRowsPerPage={onChangeRowsPerPage}
						onChangePage={onChangePage}
						paginationTotalRows={~~(tableStatus.count / tableStatus.limit + 1)}
					/> */}
					
					<Table
						header={(
							<>
								<div>A total of {(tableStatus.count)} contract(s) found</div>
							</>
						)}
						page={tableStatus.page}
						total={tableStatus.total}
						fields={fields}
						data={tableStatus.data}
						onData={onData}
					/>
				</div>
			)}
			{page === 1 && (
				<div className="side-container">
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<h2>{tableStatus.data[status.activeToken].tokenName} <small>({tableStatus.data[status.activeToken].tokenSymbol})</small></h2>
						<button className="btn-default mb0" onClick={goBack}>Back</button>
					</div>
					<div className="mb5">
						<label className="input-form">
							<span>Owner</span>
							<input type="text" value={tableStatus.data[status.activeToken].owner} disabled />
						</label>
						<label className="input-form">
							<span>Token Address</span>
							<input type="text" value={tableStatus.data[status.activeToken].contract} disabled />
						</label>
						<div className="row">
							<div className="col-md-6">
								<label className="input-form">
									<span>Company Name</span>
									<input type="text" value={tableStatus.data[status.activeToken].companyName} disabled />
								</label>
								<label className="input-form">
									<span>Official Website</span>
									<a target="_blank" href={tableStatus.data[status.activeToken].officialWebsite} rel="noreferrer">{tableStatus.data[status.activeToken].officialWebsite}</a>
								</label>
								<label className="input-form">
									<span>Twitter Handle</span>
									<a target="_blank" href={tableStatus.data[status.activeToken].twitterHandle} rel="noreferrer">{tableStatus.data[status.activeToken].twitterHandle}</a>
								</label>
								<label className="input-form">
									<span>Company Residential Address</span>
									<a target="_blank" href={tableStatus.data[status.activeToken].companyresidentialaddress} rel="noreferrer">{tableStatus.data[status.activeToken].companyresidentialaddress}</a>
								</label>
								<label className="input-form">
									<span>Business Email</span>
									<a target="_blank" href={"maltro:" + tableStatus.data[status.activeToken].businessEmail} rel="noreferrer">{tableStatus.data[status.activeToken].businessEmail}</a>
								</label>
							</div>
							<div className="col-md-6">
								<label className="input-form">
									<span>Phone Number</span>
									<input type="text" value={tableStatus.data[status.activeToken].phonenumber} disabled />
								</label>
								<label className="input-form">
									<span>Business License Screenshot</span>
									<img src={(`${config.httpServer}/image/${tableStatus.data[status.activeToken].businesslicensescreenshot}`)} alt="license" width={"50%"} />
								</label>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<label className="input-form">
									<span>Token Image</span>
									<img src={(`${config.httpServer}/image/${tableStatus.data[status.activeToken].tokenimage}`)} alt="tokenImage" width={"30%"} />
								</label>
							</div>
							<div className="col-sm-6 pl5 pr5">
								<label className="input-form">
									<span>Token Name</span>
									<input type="text" value={tableStatus.data[status.activeToken].tokenName} disabled />
								</label>
								<label className="input-form">
									<span>Token Symbol</span>
									<input type="text" value={tableStatus.data[status.activeToken].tokenSymbol} disabled />
								</label>
								<label className="input-form">
									<span>Token Decimals</span>
									<input type="text" value={tableStatus.data[status.activeToken].tokenDecimals} disabled />
								</label>
								<label className="input-form">
									<span>Token TotalSupply</span>
									<input type="text" value={tableStatus.data[status.activeToken].tokenTotalSupply} disabled />
								</label>
							</div>
						</div>
						<label className="input-form">
							<span>Token Type</span>
							<input type="text" value={tableStatus.data[status.activeToken].tokentype} disabled />
						</label>
						<label className="input-form">
							<span>Total Marketcap</span>
							<input type="text" value={tableStatus.data[status.activeToken].totalmarketcap} disabled />
						</label>
						<label className="input-form">
							<span>Market Pair</span>
							<input type="text" value={tableStatus.data[status.activeToken].marketpair} disabled />
						</label>
						<label className="input-form">
							<span>Social Url</span>
							{tableStatus.data[status.activeToken].socialUrl.map((i, k: number) => (
								<a key={k} target="_blank" href={tableStatus.data[status.activeToken].socialUrl[k]} rel="noreferrer">{tableStatus.data[status.activeToken].socialUrl[k]}</a>
							))}
						</label>
						<label className="input-form">
							<span>Created Date</span>
							<input type="text" value={toDate(tableStatus.data[status.activeToken].created)} disabled />
						</label>
						<label className="input-form">
							<span>Updated Date</span>
							<input type="text" value={tableStatus.data[status.activeToken].updated} disabled />
						</label>
						<label className="input-form">
							<span>Status</span>
							<input type="text" value={tableStatus.data[status.activeToken].status} disabled />
						</label>
						{tableStatus.data[status.activeToken].status === "rejected" && (
							<label className="input-form">
								<span>Description</span>
								<textarea disabled>{tableStatus.data[status.activeToken].advice}</textarea>
							</label>
						)}
					</div>
					<div className="text-right">
						{tableStatus.data[status.activeToken].status === "pending" && (
							<>
								<button className="btn-default mr2" onClick={accept}>Accept</button>
								<button className="btn-default mr2" onClick={() => setStatus({ ...status, adviceModal: true })}>Reject</button>
							</>
						)}
						<button className="btn-default" onClick={goBack}>Back</button>
					</div>
				</div>
			)}

			{status.adviceModal && (
				<Modal onClose={() => setStatus({ ...status, adviceModal: false })}>
					<div>
						<label className="input-form">
							<span>Description</span>
							<textarea onChange={(e) => setDesc(e.target.value)} disabled={tableStatus.data[status.activeToken].status !== "pending"}>{desc}</textarea>
						</label>
						<div className="text-right">
							<button className="btn-default mr2" onClick={reject}>OK</button>
							<button className="btn-default mr2" onClick={() => setStatus({ ...status, adviceModal: false })}>Calcel</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}

export default Tokens;