import random

def generate_traffic_data():
    # Simulated traffic data
    packet_rate = random.randint(100, 2000)  # packets/sec
    avg_packet_size = random.randint(40, 1500)  # bytes
    syn_count = random.randint(10, 500)

    return {
        'packet_rate': packet_rate,
        'avg_packet_size': avg_packet_size,
        'syn_count': syn_count
    }
