# cmake file to build rest_api

INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/apps/rest_api/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/libs/adaptor/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/libs/nccp/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/libs/nccp/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/global/include/nccp)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/libs/comm/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/libs/promain/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/apps/rctl/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/apps/audio/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/apps/ipio/include)
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/interfaces/videoDefinitions)

ADD_LIBRARY( restapi_c STATIC
 src/CRestapiDefault.cc
 src/CIpstream.cc
 src/CLogo.cc
)

TARGET_LINK_LIBRARIES( restapi_c adaptor prm comm prmtool prmnet nccpdesc nccpmsg nccptree nccpxml pthread)

ADD_DEPENDENCIES(restapi_c
adaptor
prm 
comm 
prmtool 
prmnet 
nccpdesc 
nccpmsg 
nccptree 
nccpxml
)

configure_file(wrapper.sh.in wrapper.sh @ONLY) 

add_custom_target(restapi ALL
        COMMAND /bin/tcsh ${PROJECT_SOURCE_DIR}/build/apps/rest_api/wrapper.sh ${ANBASE_SYSROOT}/usr/lib/node_modules/cmake-js/bin/cmake-js compile --out=${PROJECT_SOURCE_DIR}/build/apps/rest_api/nodejs --CDTOOLCHAIN_TUPPLE="x86_64-andro830-linux-gnu" --CDCMAKE_TOOLCHAIN_FILE="${PROJECT_SOURCE_DIR}/conf/toolchain-x86_64.cmake"
        WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}/apps/rest_api/nodejs
        DEPENDS restapi_c adaptor prm comm prmtool prmnet nccpdesc nccpmsg nccptree nccpxml
)
