import React, { useEffect, useRef, useState } from 'react';
import noPoster from '../assets/images/no-image.png';

function SearchMovies() {
	const apiKey = 'a96c918b';

	const [keyword, setKeyword] = useState('');
	const [movies, setMovies] = useState([]);
	const searchKey = useRef(null);

	useEffect(() => {
		const endpoint = `http://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;

		const getMovies = async () => {
			const { Response, Search: movies } = await fetch(endpoint).then(res => res.json());
			Response && setMovies(movies);
		};

		getMovies();
	}, [keyword]);

	const onSubmit = (e) => {
		e.preventDefault();
		setKeyword(searchKey.current.value);
	};

	return (
		<div className="container-fluid">
			{
				apiKey !== '' ?
					<>
						<div className="row my-4">
							<div className="col-12 col-md-6">
								{/* Buscador */}
								<form method="GET" onSubmit={onSubmit}>
									<div className="form-group">
										<label htmlFor="">Buscar por título:</label>
										<input ref={searchKey} type="text" className="form-control" />
									</div>
									<button className="btn btn-info">Search</button>
								</form>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h2>Películas para la palabra: {keyword}</h2>
							</div>
							{/* Listado de películas */}
							{
								movies && movies.map((movie, i) => {
									return (
										<div className="col-sm-6 col-md-3 my-4" key={i}>
											<div className="card shadow mb-4">
												<div className="card-header py-3">
													<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
												</div>
												<div className="card-body">
													<div className="text-center">
														<img
															className="img-fluid px-3 px-sm-4 mt-3 mb-4"
															src={movie.Poster !== 'N/A' ? movie.Poster : noPoster}
															alt={movie.Title}
															style={{ width: '90%', height: '400px', objectFit: 'cover' }}
														/>
													</div>
													<p>{movie.Year}</p>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
						{movies === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
					</>
					:
					<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	);
};

export default SearchMovies;
