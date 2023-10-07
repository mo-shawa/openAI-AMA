import React from "react"
import { FaLinkedin, FaGithubSquare } from "react-icons/fa"

export default function IconBar() {
	return (
		<div className="iconBar">
			<div>
				<a href="http://linkedin.com/in/mo-shawa">
					<FaLinkedin size={40} />
				</a>
				<a href="http://github.com/mo-shawa">
					<FaGithubSquare size={40} />
				</a>
			</div>
			<a href="http://shawa.dev">shawa.dev</a>
		</div>
	)
}
