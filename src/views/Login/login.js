import React from "react";
import axios from "axios";
import { Link, Redirect, Switch } from "react-router-dom";
import {login_url} from '../../service/constant';
import {connect} from 'react-redux';
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: "",
			load: false,
		};
	}

	onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value,
		});
	};

	hasToken = () => {
		if (localStorage.getItem("token")) return true;
		return false;
	};
	
	componentWillMount(){
		this.props.setLogin(false)
	}

	onSubmit = async (e) => {
		e.preventDefault();
		this.setState({
			load: true,
		});

		var auth_info = {
			email: this.state.email,
			password: this.state.password,
		};
		await axios
			.post(login_url, auth_info)
			.then((res) => {
				console.log(res);
				if (res.data.auth) {
					localStorage.setItem("token", res.data.token);
					this.props.setLogin(true)
					this.setState({
						load: false,
					});
				}
			})
			.catch((e) => {
				console.log(e)
				if (e.response && e.response.status === 401) {
					this.setState({
						error: "Sai tên đăng nhập hoặc mật khẩu",
						load: false,
					});
				} else {
					this.setState({
						error: "Có lỗi",
						load: false,
					});
				}
			});
	};

	render() {
		if (this.props.isLogin === true) return <Redirect to="/" />;
		return (
			<div className="container-fluid login-background">
				<div className="row">
					<div className="col-md-4"></div>
					<div
						id="loginbox"
						style={{ marginTop: "50px" }}
						className="mainbox col-md-4 col-md-offset-3 col-sm-8 col-sm-offset-2"
					>
						<div className="panel panel-info">
							<div className="panel-heading">
								<div className="panel-title">
									<h3>Đăng nhập</h3>
								</div>
								<div
									style={{
										float: "right",
										fontSize: "80%",
										position: "relative",
										top: "-10px",
									}}
								>
									<a href="#" style={{ color: "white" }}>
										Quên mật khẩu
									</a>
								</div>
							</div>

							<div
								style={{ paddingTop: "30px" }}
								className="panel-body"
							>
								<div
									style={{ display: "none" }}
									id="login-alert"
									className="alert alert-danger col-sm-12"
								></div>
								<form
									className="form-horizontal"
									onSubmit={this.onSubmit}
								>
									<div
										style={{ marginBottom: "25px" }}
										className="input-group"
									>
										<input
											value={this.state.email}
											onChange={this.onChange}
											type="text"
											className="form-control"
											name="email"
											placeholder="Email"
										/>
									</div>
									<div
										style={{ marginBottom: "25px" }}
										className="input-group"
									>
										<input
											value={this.state.password}
											onChange={this.onChange}
											type="password"
											className="form-control"
											name="password"
											placeholder="Mật khẩu"
										/>
									</div>
									<div
										style={{ marginBottom: "10px" }}
										className="form-group"
									>
										<input
											className="btn btn-primary"
											type="submit"
											value="Đồng ý"
										/>
									</div>
									<div className="form-group">
										<div
											style={{
												borderTop: "1px solid #888",
												paddingTop: "15px",
												fontSize: "85%",
												color: "white",
											}}
										>
											<Link
												style={{ color: "white" }}
												to="/admin"
											>
												Đăng ký
											</Link>
										</div>
									</div>
									{this.state.load && (
										<div>
											<div
												className="spinner-border"
												role="status"
											>
												<span className="sr-only">
													Loading...
												</span>
											</div>
										</div>
									)}

									{this.state.error != "" ? (
										<div className="alert alert-danger">
											{this.state.error}
										</div>
									) : (
										""
									)}
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		);
	}
}

const mapState = state => ({
 isLogin: state.isLogin
})

const mapDispatch = dispatch => ({
 setLogin: (login)=>{
	 dispatch({type:"SET_LOGIN",login})
 }
})

export default connect(mapState, mapDispatch)(Login) ;
