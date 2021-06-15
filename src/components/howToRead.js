import '../styles/howToRead.css';
import dashboard from '../images/dashboard.png';
import filters from '../videos/filters.mov';
import lines from '../videos/lines.mov';
import selection from '../videos/selection.mov';
import wine from '../images/wine.png';
import winery from '../videos/winery.mov';
import taster from '../videos/taster.mov';

function Read() {
	return (
		<div className="my-container">
			<div className="row">
				<div className="col-4">
					<div className="list-group" id="list-tab" role="tablist">
						<a
							className="list-group-item list-group-item-action active"
							id="list-what-list"
							data-toggle="list"
							href="#list-what"
							role="tab"
							aria-controls="what"
						>
							What is Somma?
						</a>
						<a
							className="list-group-item list-group-item-action"
							id="list-filters-list"
							data-toggle="list"
							href="#list-filters"
							role="tab"
							aria-controls="filters"
						>
							Filters
						</a>
						<a
							className="list-group-item list-group-item-action"
							id="list-lines-list"
							data-toggle="list"
							href="#list-lines"
							role="tab"
							aria-controls="lines"
						>
							Line Charts
						</a>
						<a
							className="list-group-item list-group-item-action"
							id="list-selection-list"
							data-toggle="list"
							href="#list-selection"
							role="tab"
							aria-controls="selection"
						>
							Wine Glass Selection
						</a>
						<a
							className="list-group-item list-group-item-action"
							id="list-wine-list"
							data-toggle="list"
							href="#list-wine"
							role="tab"
							aria-controls="wine"
						>
							Wine Page
						</a>
						<a
							className="list-group-item list-group-item-action"
							id="list-winery-list"
							data-toggle="list"
							href="#list-winery"
							role="tab"
							aria-controls="winery"
						>
							Winery Page
						</a>
						<a
							className="list-group-item list-group-item-action"
							id="list-taster-list"
							data-toggle="list"
							href="#list-taster"
							role="tab"
							aria-controls="taster"
						>
							Taster Page
						</a>
					</div>
				</div>
				<div className="col-8">
					<div className="tab-content" id="nav-tabContent">
						<div
							className="tab-pane fade show active"
							id="list-what"
							role="tabpanel"
							aria-labelledby="list-what-list"
						>
							<h4 className="title">What is Somma?</h4>
							<p className="description">
								Somma is a dashboard wine visualization that allows you to make a selection based on
								multiple filters. With a selection of wines, you can then dive into the background of
								each wine, which consists of the wine information, winery, and taster statistics!
							</p>
							<img
								src={dashboard}
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								alt="Wine Page"
							/>
						</div>
						<div
							className="tab-pane fade"
							id="list-filters"
							role="tabpanel"
							aria-labelledby="list-filters-list"
						>
							<h4 className="title">Filters</h4>
							<p className="description">
								Filters allow users to select the type of wines they want to view. By selecting the
								Price, Rank, Country, and Taster filters, you can receive a selection of wines. Note all
								wines are ranked with the 80 - 100 range.
							</p>
							<video
								className="videoTag"
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								autoPlay
								loop
								muted
							>
								<source src={filters} type="video/mp4" />
							</video>
						</div>
						<div
							className="tab-pane fade"
							id="list-lines"
							role="tabpanel"
							aria-labelledby="list-lines-list"
						>
							<h4 className="title">Line Charts</h4>
							<p className="description">
								Price and Rank amount allows you to hover on the lines to view the number of wines per
								price or rank. Note that you must apply selection filters to view the line statistics.
							</p>
							<video
								className="videoTag"
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								autoPlay
								loop
								muted
							>
								<source src={lines} type="video/mp4" />
							</video>
						</div>
						<div
							className="tab-pane fade"
							id="list-selection"
							role="tabpanel"
							aria-labelledby="list-selection-list"
						>
							<h4 className="title">Wine Glass Selection</h4>
							<p className="description">
								After applying all filters, you will receive a selection of wines. You can then hover on
								them to see the title and country of the wine. Furthermore, you can click the wine glass
								to see more information on that particular wine.
							</p>
							<video
								className="videoTag"
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								autoPlay
								loop
								muted
							>
								<source src={selection} type="video/mp4" />
							</video>
						</div>
						<div className="tab-pane fade" id="list-wine" role="tabpanel" aria-labelledby="list-wine-list">
							<h4 className="title">Wine Page</h4>
							<p className="description">
								The wine page is reached by clicking a wine glass. You can view all the information on
								the wine you click.
							</p>
							<img
								src={wine}
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								alt="Wine Page"
							/>
						</div>
						<div
							className="tab-pane fade"
							id="list-winery"
							role="tabpanel"
							aria-labelledby="list-winery-list"
						>
							<h4 className="title">Winery Page</h4>
							<p className="description">
								The winery page allows you to see all the wines from a particular winery. You can hover
								on a line to see a wine's title, price, and rank. Furthermore, if you click a line, it
								will redirect you back to the wine page with that specific wine information.
							</p>
							<video
								className="videoTag"
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								autoPlay
								loop
								muted
							>
								<source src={winery} type="video/mp4" />
							</video>
						</div>
						<div
							className="tab-pane fade"
							id="list-taster"
							role="tabpanel"
							aria-labelledby="list-taster-list"
						>
							<h4 className="title">Taster Page</h4>
							<p className="description">
								The taster page allows you to select a taster (person who has reviewed wines) to compare
								to the taster from the wine glass chosen. You can then view different statistics on each
								taster.
							</p>
							<video
								className="videoTag"
								style={{ borderRadius: '16px', border: '1px solid white' }}
								width="100%"
								autoPlay
								loop
								muted
							>
								<source src={taster} type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Read;

{
	/* <section className="what-is-somma">
    <div className="left">
        <div className="inner">
            <h4 className="title">What is Somma?</h4>
            <p className="description">Somma is a wine visualization that allows you to make a selection based on multiple filters. With a selection of wines, you can then dive into the background of each wine, which consists of the wine information, winery, and taster statistics!</p>
        </div>
    </div>
    <img src={logo} className="right transition" alt="Somma Dashboard" width= "100%"/>
</section> */
}
