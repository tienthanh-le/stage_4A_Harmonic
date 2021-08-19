#ifndef __CIpstream_h__
#define __CIpstream_h__

/*** Includes */
#include "prm_mainthread.h"
#include "procdef.h"
#include "promain.h"
#include "prm_macro.h"
#include "adaptor.h"

// tableau t_NCCPD_stream dans "adator.h"
// typedef struct
// {
//     unsigned char stream_enable;
//     uint32_t IP_subscribe_address;
//     unsigned short UDP_subscribe_port;
//     uint32_t source_IP_address;
//     unsigned char FEC_enable;
//     unsigned char physical_port;
// } t_NCCPD_stream;

/*** Prototypes */
class CIpstream
{
private:
    unsigned int ipstream_id;
    t_NCCPD_stream m_oNCCPDstream;

public:
    CIpstream();
    ~CIpstream();

    const unsigned char get_stream_enable() const { return m_oNCCPDstream.stream_enable; };
    void set_stream_enable(const unsigned char str_en) { m_oNCCPDstream.stream_enable = str_en; };

    const int32_t get_IP_subscribe_address() const { return m_oNCCPDstream.IP_subscribe_address; };
    void set_IP_subscribe_address(const int32_t ip_add) { m_oNCCPDstream.IP_subscribe_address = ip_add; };

    const unsigned short get_UDP_subscribe_port() const { return m_oNCCPDstream.UDP_subscribe_port; };
    void set_UDP_subscribe_port(const unsigned short udp_port) { m_oNCCPDstream.UDP_subscribe_port = udp_port; };

    const uint32_t get_source_IP_address() const { return m_oNCCPDstream.source_IP_address; };
    void set_source_IP_address(const uint32_t srcIp_add) { m_oNCCPDstream.source_IP_address = srcIp_add; };

    const unsigned char get_FEC_enable() const { return m_oNCCPDstream.FEC_enable; };
    void set_FEC_enable(const unsigned char fec_en) { m_oNCCPDstream.FEC_enable = fec_en; };

    const unsigned char get_physical_port() const { return m_oNCCPDstream.physical_port; };
    void set_physical_port(const unsigned char phys_port) { m_oNCCPDstream.physical_port = phys_port; };

    const unsigned int get_ipstream_id() const { return ipstream_id; };
    void set_ipstream_id(const unsigned int id) { ipstream_id = id; };
};

#endif

/* EOF */

/* Junk stuffs */
/* -- */

// int restapi_getdata(std::string[]);
// int restapi_setdata(const std::string[]);

// const unsigned char get_stream_enable() const { return stream.stream_enable; };
// void set_stream_enable(const unsigned char str_en) { stream.stream_enable = str_en; };

// const int32_t get_IP_subscribe_address() const { return stream.IP_subscribe_address; };
// void set_IP_subscribe_address(const int32_t ip_add) { stream.IP_subscribe_address = ip_add; };

// const unsigned short get_UDP_subscribe_port() const { return stream.UDP_subscribe_port; };
// void set_UDP_subscribe_port(const unsigned short udp_port) { stream.UDP_subscribe_port = udp_port; };

// const uint32_t get_source_IP_address() const { return stream.source_IP_address; };
// void set_source_IP_address(const uint32_t srcIp_add) { stream.source_IP_address = srcIp_add; };

// const unsigned char get_FEC_enable() const { return stream.FEC_enable; };
// void set_FEC_enable(const unsigned char fec_en) { stream.FEC_enable = fec_en; };

// const unsigned char get_physical_port() const { return stream.physical_port; };
// void set_physical_port(const unsigned char phys_port) { stream.physical_port = phys_port; };
/* -- */