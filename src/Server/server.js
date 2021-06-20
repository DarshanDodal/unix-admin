import axios from "axios";
const serverLink =
	"https://cdm67ylvp0.execute-api.ap-south-1.amazonaws.com/dev";
const fileUpload =
	"https://fsv0ege035.execute-api.ap-south-1.amazonaws.com/dev";

export const UploadFile = (formdata, name, type) => {
	const response = new Promise((resolve, reject) => {
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios
			.post(
				fileUpload + `/unix/upload?name=${name}&type=${type}`,
				formdata,
				config
			)
			.then((res) => {
				resolve(res.data.file);
			})
			.catch((err) => {
				reject(err);
			});
	});
	return response;
};

export const UploadMultiFile = (formdata) => {
	const response = new Promise((resolve, reject) => {
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios
			.post(fileUpload + `/unix/multiple-upload`, formdata, config)
			.then((res) => {
				resolve(res.data.files);
			})
			.catch((err) => {
				reject(err);
			});
	});
	return response;
};

export const UploadDeleteFile = (formdata, name, type) => {
	const response = new Promise((resolve, reject) => {
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios
			.post(
				fileUpload + `/unix/upload-delete?name=${name}&type=${type}`,
				formdata,
				config
			)
			.then((res) => {
				resolve(res.data.file);
			})
			.catch((err) => {
				reject(err);
			});
	});
	return response;
};

/*----------------------------------------------------------Courses Handler--------------------------------------------------*/

export const GetCourses = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/courses")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const NewCourse = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/new/course", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const UpdateCourse = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/update/course", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const DeleteCourse = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/delete/course", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const SubscribeCourse = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/subscribe/course", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

/*----------------------------------------------------------Teachers Handler--------------------------------------------------*/
export const GetTeachers = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/teachers")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const NewTeacher = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/new/teacher", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const UpdateTeacher = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/update/teacher", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const DeleteTeacher = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/delete/teacher", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

/*----------------------------------------------------------Students Handler--------------------------------------------------*/

export const NewStudent = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/new/student", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};
export const GetStudents = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/students")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const UpdateStudent = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/update/student", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const DeleteStudent = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/delete/student", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const UpdateStudentFile = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/update/student/file", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

/*----------------------------------------------------------Inquiries Handler--------------------------------------------------*/

export const GetInquiries = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/inquiries")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const GetJoinedInquiriesCount = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/inquiries/joined")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const NewInquiry = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/new/inquiry", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const UpdateInquiry = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/update/inquiry", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

/*----------------------------------------------------------Feedback Handler--------------------------------------------------*/
export const GetFeedback = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/feedback/course")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

/*----------------------------------------------------------About-Us Handler--------------------------------------------------*/
export const GetAboutUs = () => {
	const response = new Promise((resolve, reject) => {
		fetch(serverLink + "/get/about-us")
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};

export const ChangeAboutUs = async (body) => {
	const response = await new Promise((resolve, reject) => {
		fetch(serverLink + "/change/about-us", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((res) => {
				resolve(res);
			})
			.catch((err) => reject(err));
	});
	return response;
};
