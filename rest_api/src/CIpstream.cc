/*!
* \file CIPstream.cc
*@{*/

/*** Includes */
#include "CIpstream.h"

/*** Prototypes */

CIpstream::CIpstream()
{
    ipstream_id = 0;
    m_oNCCPDstream.stream_enable = 0;
    m_oNCCPDstream.IP_subscribe_address = 0;
    m_oNCCPDstream.UDP_subscribe_port = 0;
    m_oNCCPDstream.source_IP_address = 0;
    m_oNCCPDstream.FEC_enable = 0;
    m_oNCCPDstream.physical_port = 0;
};
CIpstream::~CIpstream(){};

/* EOF */