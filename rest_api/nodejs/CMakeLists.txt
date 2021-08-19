cmake_minimum_required(VERSION 3.9)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 11)
project (cmake-addon)

SET(ANBASE_SYSROOT /local/cancouetg/anbase9k_kernel419/platform-Andromede/sysroot-target)
SET(ANDREAS9K_SOURCE_DIR ${PROJECT_SOURCE_DIR}/../../..)

INCLUDE_DIRECTORIES(${CMAKE_JS_INC})
INCLUDE_DIRECTORIES(${ANDREAS9K_SOURCE_DIR}/apps/rest_api/include)

INCLUDE_DIRECTORIES("${ANBASE_SYSROOT}/usr/include/node")
file(GLOB SOURCE_FILES "./addon/addon.cc") 

add_library(restapi STATIC IMPORTED)
set_property(TARGET restapi PROPERTY IMPORTED_LOCATION "${ANDREAS9K_SOURCE_DIR}/build/apps/rest_api/librestapi_c.a")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
target_link_libraries(${PROJECT_NAME} restapi)
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# Include Node-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})

# define NPI_VERSION
add_definitions(-DNAPI_VERSION=3)

ADD_DEFINITIONS(
   -DFIXME_FOR_ANDREAS
   -O3
   -DOS_LINUX
   -D_GNU_SOURCE
   -D_REENTRANT
   -fPIC
   -fno-common
# AVX isn't enabled unless -mavx (or a -march setting that includes it). Without that, the compiler isn't allowed to generate code that uses AVX instructions
    -mavx2          # for Intel® Advanced Vector Extensions 2 (Intel® AVX2)
#   -march=skylake  # for Intel® Xeon® Processor E3 v6 Family = SSE4.1, Intel® SSE4.2, Intel® AVX2
   -fsigned-char
   -pipe
   -DSW_ANDREAS
   -DHW_BBOARD
   -fno-strict-aliasing
   -DOEM_THOMSON
   -DSTD_DVB
   -DPF_REAL
#        -DMUXCORE_TRACE_DEBUG
#        -DDEBUG_MUXCORE_ROUTER
#        -DDEBUG_MUXCORE_SLOTQUEUES
    -DMUX_ETR290_MIB
#    -D_ANDRSIPSI_TEST
     -D_ANDREAS_KAL
     -D_NO_SCRIBE    
     -D_NO_ASI
     -D_NO_PIP     
#   -DSCHED_READ_NONBLOCK
     -D_ANDREASTOOLS_PERF
#     -D_ANDREASTOOLS_SPY
     -D_ANDREASTOOLS_STREAMSTAT
     -D_ANDREASTOOLS_MSGCONSISTENCY
     -D_ANDREASTOOLS_INPUTSTC
     -D_ANDREAS_LOG_INPUTSTC #This flag is used to enable log files (/tmp/andreasTools/andreasToolsStc_x.log) when STC at scheduler input has been patched
     -D_ANDREAS_LOG_SOFTMRMSTC #This flag is used to enable log files (/tmp/andreasTools/andreasSoftMRMStc_x.log) when STC at chronos input has been patched
#    -D_ANDREAS_LOG_MXSLOCALINFO #This flag is used to enable log files (/tmp/andreasTools/andreasMxsLocal_info.log) on internal flextream abnormal behaviour
#    -D_ANDREAS_LOG_MUXCOREDEBUG #This flag is used to enable log files (/tmp/andreasTools/andreasMuxCoreDebug.log) for MuxCore task debug
#    -D_ANDREAS_LOG_MUXCOREINFO #This flag is used to enable log files (/tmp/andreasTools/andreasMuxCoreInfo.log) for MuxCore task information
    -D_ANDREAS_LOG_MUXCOREERROR #This flag is used to enable log files (/tmp/andreasTools/andreasMuxCoreError.log) for MuxCore task error
#    -D_ANDREAS_DUMP_INPUT_PCRSTC #This flag is used to dump the PCR/STC couple (/tmp/PCRSTC_input%x.csv) from the PCR component
#    -D_ANDREAS_INPUT_PCRSTC_SLOPE #This flag is used to display the Delta STC/PCR slope on sliding window (1000 samples)
      -DNO_DSF
      -DNO_DPI
      -DNO_MUXSTAT
      -D_NO_TSDATA
      -D_BMNG_TEST_TEMP_FAN_POWER_ALARM
 #    -DBISS2_SCHEDULER_SCRAMBLING         # BISS2 scrambling in Schedulers or in Mux
    -Wall
   -Werror=array-bounds 
)

# stub pegasus
ADD_DEFINITIONS(-DRCTL_PEGASUS_STUB)
set(RCTL_PEGASUS_STUB 1)

