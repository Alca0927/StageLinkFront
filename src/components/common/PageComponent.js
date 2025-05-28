const PageComponent = ({serverData, movePage}) => {
    
    const handlePageClick = (pageNum) => {
        console.log('페이지 클릭:', pageNum, '현재 페이지:', serverData.current); // 디버깅용
        movePage({page: pageNum});
    }

    const handlePrevClick = () => {
        console.log('이전 페이지 클릭:', serverData.prevPage); // 디버깅용
        movePage({page: serverData.prevPage});
    }

    const handleNextClick = () => {
        console.log('다음 페이지 클릭:', serverData.nextPage); // 디버깅용
        movePage({page: serverData.nextPage});
    }

    return (  
      <div className="m-6 flex justify-center">
        {serverData.prev ? 
          <div 
            className="m-2 p-2 w-16 text-center font-bold text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={handlePrevClick}>
            Prev 
          </div> : <></>
        }  

        {serverData.pageNumList.map(pageNum => 
          <div 
            key={pageNum}
            className={`m-2 p-2 w-12 text-center rounded shadow-md text-white cursor-pointer hover:opacity-80 ${
              serverData.current === pageNum ? 'bg-gray-500' : 'bg-blue-400'
            }`}
            onClick={() => handlePageClick(pageNum)}>
            {pageNum}
          </div>
        )}

        {serverData.next ? 
          <div 
            className="m-2 p-2 w-16 text-center font-bold text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={handleNextClick}> 
            Next 
          </div> : <></>
        }  
      </div>   
    );
}

export default PageComponent;